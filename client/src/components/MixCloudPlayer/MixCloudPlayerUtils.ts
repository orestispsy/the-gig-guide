module.exports.moveBack = (nightFlightProg:any,setNightFlightProg:(e:any)=> void, radioBroadcasts:any)=>{
 if (nightFlightProg.id <= 0) {
     return;
 } else {
     setNightFlightProg(
         radioBroadcasts.radioBroadcasts[nightFlightProg.id - 1]
     );
 }
}

module.exports.moveForward = (
    nightFlightProg: any,
    setNightFlightProg: (e: any) => void,
    radioBroadcasts: any
) => {
    if (nightFlightProg.id >= radioBroadcasts.radioBroadcasts.length - 1) {
        return;
    } else {
        setNightFlightProg(
            radioBroadcasts.radioBroadcasts[nightFlightProg.id + 1]
        );
    }
};