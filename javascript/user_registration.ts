module UserRegistration {
	declare var $: any;
	declare var riot: any;

	interface SerializeUserInformation {
		whenUserRegister(callback: (userData: JSON) => void): void;
		showWelcomeMessage();
	}

	interface RegisterUser {
		saveUser(userData: JSON): void;
		whenUserIsSaved(callback: () => void): void;
	}

	export class View implements SerializeUserInformation {
		fullName: string; 
		announcer = riot.observable(this);

		constructor(){
			this.registerWithForm();
		}

		whenUserRegister(callback: (userData: JSON) => void){
			console.log("user is registered");
			this.announcer.on("whenUserRegister", callback);
		}

		showWelcomeMessage(){
			console.log("welcome user");
		}
		
		private showFullName() {
			this.fullName = $("#first-name").val() + " " + $("#last-name").val();
				$("#full-name").html(this.fullName);
		}

		private registerWithForm(){
			var _this = this;
			$("#user-form").submit(function(e) { 
				e.preventDefault();
				_this.showFullName();
				_this.announcer.trigger("whenUserRegister", () => {fullName: _this.fullName});	
			});
		}


	}
	
	export class Presenter {
		constructor(private view: SerializeUserInformation, private model: RegisterUser){
			view.whenUserRegister(this.saveUserCallback);
			model.whenUserIsSaved(this.showWelcomeMessage);
		}

		saveUserCallback(userData: JSON){
			//call the model the same way
			console.log(this);
			this.model.saveUser(userData);
			console.log("data is transferred");
		}

		showWelcomeMessage(){
			this.view.showWelcomeMessage();
			//call view to render welcome message;
		}
	} 


	export class Model implements RegisterUser {
		announcer = riot.observable(this);
		
		constructor(){

		}

		saveUser(userData: JSON){
			var _this = this;
			$.ajax({
				type: 'POST',
				url: $(this).attr("action"),
				data: JSON.stringify(userData),
				success: function(data) {
					_this.announcer.trigger("whenUserIsSaved");
				},
				contentType: "application/json",
				dataType: 'json'
			});
		}

		whenUserIsSaved(callback: () => void){
			this.announcer.on("whenUserIsSaved", callback);
		}
	}	
}
