var UserRegistration;
(function (UserRegistration) {
    var View = (function () {
        function View() {
            this.announcer = riot.observable(this);
            this.registerWithForm();
        }
        View.prototype.whenUserRegister = function (callback) {
            console.log("user is registered");
            this.announcer.on("whenUserRegister", callback);
        };
        View.prototype.showWelcomeMessage = function () {
            console.log("welcome user");
        };
        View.prototype.showFullName = function () {
            this.fullName = $("#first-name").val() + " " + $("#last-name").val();
            $("#full-name").html(this.fullName);
        };
        View.prototype.registerWithForm = function () {
            var _this = this;
            $("#user-form").submit(function (e) {
                e.preventDefault();
                _this.showFullName();
                _this.announcer.trigger("whenUserRegister", function () { fullName: _this.fullName; });
            });
        };
        return View;
    })();
    UserRegistration.View = View;
    var Presenter = (function () {
        function Presenter(view, model) {
            this.view = view;
            this.model = model;
            view.whenUserRegister(this.saveUserCallback());
            model.whenUserIsSaved(this.showWelcomeMessage);
        }
        Presenter.prototype.saveUserCallback = function () {
            var _this = this;
            //call the model the same way
            return function (userData) {
                console.log(_this);
                _this.model.saveUser(userData);
                console.log("data is transferred");
            };
        };
        Presenter.prototype.showWelcomeMessage = function () {
            this.view.showWelcomeMessage();
            //call view to render welcome message;
        };
        return Presenter;
    })();
    UserRegistration.Presenter = Presenter;
    var Model = (function () {
        function Model() {
            this.announcer = riot.observable(this);
        }
        Model.prototype.saveUser = function (userData) {
            var _this = this;
            $.ajax({
                type: 'POST',
                url: $(this).attr("action"),
                data: JSON.stringify(userData),
                success: function (data) {
                    _this.announcer.trigger("whenUserIsSaved");
                },
                contentType: "application/json",
                dataType: 'json'
            });
        };
        Model.prototype.whenUserIsSaved = function (callback) {
            this.announcer.on("whenUserIsSaved", callback);
        };
        return Model;
    })();
    UserRegistration.Model = Model;
})(UserRegistration || (UserRegistration = {}));
//# sourceMappingURL=out.js.map