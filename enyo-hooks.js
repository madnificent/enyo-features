//* @protected
feature.storage = {
    enyoKind : enyo.kind,
    componentCreate : enyo.Component.prototype.create,
    enyoComponentCreate : enyo.Component.create,
    componentDestroy : enyo.Component.prototype.destroy
}


feature.manageFeatures = function(inProps){
    // propagate our prototype's features, if it has features which are set to propagate
    // TODO: i think enyo.getObject doesn't automatically guess the default namespace
    var superKind = inProps.kind ? ( typeof inProps.kind == "string" ? enyo.getObject( inProps.kind ) : inProps.kind ) : enyo.Control;
    enyo.map((superKind && superKind.prototype.features) || [] ,
             function(feature) {
                 var newFeature = ( feature.onPropagate
                                    && feature.onPropagate( inProps ) );
                 if( newFeature ) {
                     inProps.features.push( newFeature );
                 }
             });

    // instantiate any features in inProps which aren't instances yet
    inProps.features = enyo.map(inProps.features, function(feature){
        if( typeof feature == "string" ){
            return enyo.createFromKind( feature );
        } else if( feature.kind ) {
            if( typeof feature.kind == "string" ) {
                feature.kind = enyo.getObject( feature.kind );
            }
            return new feature.kind( feature );
            // return new enyo.kind( feature );
        }
        return feature;
    });
    
    // call the atKind for each feature, thereby allowing it to modify the inProps representation
    enyo.map( inProps.features , function(feature){
        feature.atKind && feature.atKind(inProps);
    });
};

enyo.kind = function(inProps) {
    // propagate and call ks.features
    feature.manageFeatures(inProps);
    // create the kind
    var argsArray = Array.prototype.slice.call(arguments);
    return feature.storage.enyoKind.apply( this , argsArray );
}

for( var property in feature.storage.enyoKind ) {
    enyo.kind[property] = feature.storage.enyoKind[property];
}

// enyo.Component.create is called when createComponent is called with a recipe.  it is the equivalent of enyo.kind, but it creates an instance-like prototype (whereas enyo.kind creates a class-like prototype).
enyo.Component.create = function(props) {
    // this.adjustComponentProps(props);
    feature.manageFeatures(props);

    var argsArray = Array.prototype.slice.call(arguments);
    return feature.storage.enyoComponentCreate.apply( this , argsArray );
}

// enyo.Component.prototype.create is called when the create method of a kind is called (this is what is called when the user calls this.inherited(arguments) inside the create method of his kind.
enyo.Component.prototype.create = function() {
    var argsArray = Array.prototype.slice.call(arguments);
    feature.storage.componentCreate.apply( this , argsArray );

    enyo.map( this.features || [] , enyo.bind(this, function( feature ) {
	if( feature.atCreate ){
	    feature.atCreate( this );
	}
    } ) );
}

enyo.Component.prototype.destroy = function() {
    var argsArray = Array.prototype.slice.call(arguments);
    feature.storage.componentDestroy.apply( this , argsArray );

    enyo.map( this.features || [] , enyo.bind(this, function( feature ) {
	if( feature.atDestroy ){
	    feature.atDestroy( this );
	}
    } ) );
}