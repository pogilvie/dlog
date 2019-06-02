#!/usr/bin/env node
// © 2019 Peter Ogilvie (code@ogilvie.us.com)
const
                 fs = require('fs'),
      child_process = require('child_process'),
    createCsvWriter = require('csv-writer').createObjectCsvWriter
          columnify = require('columnify'),
            Program = require('pogilvie_opt'),
            program = new Program(),
            lgquery = 'SELECT Id, LogUser.Name, Request, Operation, Application, Status, DurationMilliseconds, LogLength FROM ApexLog'

program.version('1.0.0')
       .option('-u --user <user>',  'user name or alias associated with the target org')
       .parse(process.argv)

const query = child_process.spawnSync('sfdx', ['force:data:soql:query', '-u', program.user, '-q', lgquery, '--json'],  { encoding: 'utf-8' } )

const query_result = JSON.parse(query.stdout)

const output = [], csvout = []

if (query_result.result.done) {

    const csvWriter = createCsvWriter({
        path: './index.csv',
        header: [
            {id: 'id',        title: 'ID'},
            {id: 'name',      title: 'NAME'},
            {id: 'request',   title: 'REQUEST'},
            {id: 'duration',  title: 'DURATION MSEC'},
            {id: 'loglength', title: 'LOG LENGTH'},
            {id: 'status',    title: 'STATUS'}
        ]
    });

    query_result.result.records.forEach(function(r) {

        output.push({
            Id: r.Id,
            User: r.LogUser.Name,
            Request: r.Request,
            Status: r.Status,
            DurationMsec: r.DurationMilliseconds,
            "Log Length": r.LogLength
        })

        csvout.push({
            id: r.Id,
            name: r.LogUser.Name,
            request: r.Request,
            status: r.Status,
            duration: r.DurationMilliseconds,
            loglength: r.LogLength
        })

        let debugLog = child_process.spawnSync(
            'sfdx', ['force:apex:log:get', '-u', program.user, '-i', r.Id], 
             { encoding: 'utf-8' }
        )
        fs.writeFileSync(r.Id + '.log', debugLog.stdout, {mode: 0o664})
        console.log('wrote log ' + r.Id)

    })

    console.log(columnify(output))

    csvWriter.writeRecords(csvout).then(() => {
        console.log('directory written to index.csv');
    });

}
