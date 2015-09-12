module UserRegistration {
	declare var $: any;
	declare var riot: any;
	
	interface SerializeUserInformation {

	}

	interface RegisterUser {

	}

	export class View implements SerializeUserInformation { 

	}
	
	export class Presenter {
		constructor(view: SerializeUserInformation, model: RegisterUser){

		}
	} 


	export class Model implements RegisterUser {

	}	
}