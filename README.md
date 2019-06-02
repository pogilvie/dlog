# dlog
Download all Debug Log files form a Salesforce Org

### Install

If you don't already have [node](https://nodejs.org/en/) and [sfdx](https://developer.salesforce.com/tools/sfdxcli) (Salesforce cli) install then install them.

Install dlog

- sudo npm install @pogilvie/dlog

### Setup

dlog requires an authenticated DX user.  Create an authentication entry in the force:org:list if an entry for the target org does not already exist.

````
$ sfdx force:auth:web:login -a <your org alias>
````

### Run

Create a directory for you downloaded logs to go in and cd into the directory

````
$ mkdir logs
# cd logs
````

Finally, run the command
````
$ dlog -u myOrg
````

dlog creates an index.csv files which you may load into a spreadsheet to an overview of the downloaded logs.

````
ID                 USER          REQUEST     STATUS                                                                                                                              DURATIONMSEC LOG LENGTH
07L4N00000Nut26UAB Peter Ogilvie Api         Success                                                                                                                             701          27603     
07L4N00000Nut2BUAR Peter Ogilvie Api         Assertion Failed                                                                                                                    2710         20837     
07L4N00000Nut2GUAR Peter Ogilvie Api         Success                                                                                                                             615          5529      
07L4N00000Nut2LUAR Peter Ogilvie Api         Success                                                                                                                             1626         10366     
07L4N00000Nut2QUAR Peter Ogilvie Api         Success                                                                                                                             689          19410     
07L4N00000Nut2VUAR Peter Ogilvie Api         Success                                                                                                                             677          8355      
07L4N00000Nut2aUAB Peter Ogilvie Api         Success                                                                                                                             1404         12286     
07L4N00000Nut2fUAB Peter Ogilvie Api         Success                                                                                                                             1372         12658     
07L4N00000Nut2kUAB Peter Ogilvie Api         Success                                                                                                                             676          6027      
07L4N00000Nut2pUAB Peter Ogilvie Api         Success                                                                                                                             1431         46495     
07L4N00000Nut2uUAB Peter Ogilvie Api         Success                                                                                                                             1023         7239      
07L4N00000Nut2zUAB Peter Ogilvie Api         Insert failed. First exception on row 0; first error: REQUIRED_FIELD_MISSING, Required fields are missing: [ProfileId]: [ProfileId] 1955         32313     
07L4N00000Nut34UAB Peter Ogilvie Api         Insert failed. First exception on row 0; first error: FIELD_CUSTOM_VALIDATION_EXCEPTION, Books must have two pages: []              1057         4016      
07L4N00000Nut39UAB Peter Ogilvie Api         Success                                                                                                                             1030         3520      
07L4N00000Nut3EUAR Peter Ogilvie Api         Success                                                                                                                             3982         1715345   
07L4N00000Nut3JUAR Peter Ogilvie Api         Success                                                                                                                             1073         15922     
````
