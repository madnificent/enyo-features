enyo.kind({
    name : "feature.IsMixin.exampleHasWarnings",
    kind : feature.Feature,
    features : [ { kind : feature.IsMixin ,
                   mixin : {
                       warnDeveloper : function( message ) {
                           console.log( "warning from " + this + ( message ? ": " + message : "" ) );
                       },
                       warnUser : function( message ) {
                           alert( "warning from " + this + ( message ? ": " + message : "" ) );
                       }
                   } } ],
    atKind : function( user ) {
        console.log( "exampleHasWarnings is extending kind for " + this );
    }
});