/**
   enyo.Feature is the kind of which all features extend.  It is the basic building
   block for programatically altering your classes.

   TODO: Add comments on how to use this
*/
enyo.kind({
    name: "feature.Feature",
    kind: enyo.Component,
    //* @public
    /**
       If propagate is set to true, kinds which extend the kind to which this feature is added, will have this feature.
    */
    propagate: false,
    /**
       If atKind in truthy, it should contain a function which can modify the description of the kind, before the kind itself is created.  It can symbolically modify and extend the kind before the kind is created.  The function should make a call to this.inherited(arguments) as its first action.
    */
    atKind : function(that){
        return null;
    },
    /**
       If atCreate is truthy, it should contain a function which should be called when an instance of the kind (if the kind subclasses enyo.Component) is created.
    */
    atCreate : null,
    /**
       If atDestroy is truthy, it should contain a function which should be called when an instance of the kind (if the kind subclasses enyo.Component) is destroyed.
    */
    atDestroy : null
});
