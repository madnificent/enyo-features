/**
   This is a basic example of enyo.hasMixins.

   The example includes a mixin in feature.HasMixin.example which adds support for warning output.  The output can be configured based on the mixins [ simpleWarningFormatMixin , informedWarningFormatMixin , responsibleWarningFormatMixin , slangWarningFormatMixin ].
*/

var warningsMixin = {
    warnDeveloper : function( message ) {
        console.log( this.buildWarning( message ) );
    },
    warnUser : function( message ) {
        alert( this.buildWarning( message ) );
    }
};


var simpleWarningFormatMixin = {
    buildWarning : function( message ){
        return message;
    }
}

var informedWarningFormatMixin = {
    buildWarning : function( message ){
        return "Warning: " + message;
    }
}

var responsibleWarningFormatMixin = {
    buildWarning : function( message ){
        return "Warning from " + this + ": " + message;
    }
}

var slangWarningFormatMixin = {
    buildWarning : function( message ){
        return "Yo dawg, " + this + " says word. " + message;
    }
}

enyo.kind({
    name : "feature.HasMixin.example",
    kind : enyo.Control,
    features : [ { kind : feature.HasMixins,
                   mixins : [ warningsMixin , responsibleWarningFormatMixin ]
                 } ]
});
