user = dev
waittime = 20

open:
	sfdx force:org:open -u $(user)

localtest:
	sfdx force:apex:test:run -l RunLocalTests -u $(user) -w $(waittime)

log-query = ' \
SELECT Id, LogUser.Name, Request, Operation, Application, Status, DurationMilliseconds, LogLength\
FROM ApexLog '

getlogs:
	sfdx force:data:soql:query -q $(log-query) -u $(user)

getlog:
	sfdx force:apex:log:get -i 07L4N00000Nut5FUAR -u $(user) > get.log

orglist:
	sfdx force:org:list
