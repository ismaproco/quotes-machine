'use strict';

class ServiceManager {
    constructor( interval, queuElements ) {
        this.interval = interval || 5000;
        this._queu = [];
        this._runner;

        if(queuElements && queuElements.length > 0) {
            this._queu = queuElements;
        }
    }

    add(element) {
        this._queu.push(element);
    }

    clear(){
        this._queu = [];
    }

    start(){
        this._runner = setInterval(() => {
            console.log('interval running,', new Date() );
            console.log('_queu',this._queu.length);
            if( this._queu.length > 0 ) {
                if( this._queu[0].run ) {
                    this._queu[0].run();
                }
                this._queu = this._queu.splice(1);
            }
        }, this.interval);
    };

    stop(){
        clearInterval( this._runner );
    }
}

module.exports = { 
    create: (interval, queuElements) => {
        return new ServiceManager(interval, queuElements);
    }
};