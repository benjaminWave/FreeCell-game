export class EventLog{
    constructor(){
        this.events = new Array();
    }
    log(event){
        this.events.push(event);
    }
    reverse(){
        if (this.events.length>0){
            return events.pop();
        }
        return null;
    }
   
}
EventLog.LOG = new EventLog();