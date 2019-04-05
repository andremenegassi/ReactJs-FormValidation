import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super();

    this.state = {
      form: { 
        nome : "",
        email: "",
        telefone : ""

      },
      validation:{}, //for validation control
      formIsValid: false //for validation control
    };
  }

  componentDidMount(){
    console.log("componentDidMount");
    let formInputs = this.refs;
    for (let p in formInputs)
    {

      formInputs[p].addEventListener("blur", evt => {

        var obj = {};
        obj[evt.target.id] = evt.target; 
        this.validation(obj, false);

      });
     

    }
  
  }

  validation(formInputs, setfocus){
 

      for (let p in formInputs)
      {
          let value = formInputs[p].value.trim();
         
          formInputs[p].classList.remove("is-invalid");
          formInputs[p].classList.add("is-valid");

          let msgValidation = {};
          let isValid = true;

          if (formInputs[p].getAttribute("data-validation-required") != null && isValid){

              if (value == "") //customize your validation here
              {
                 isValid = false;
                 msgValidation[p] = formInputs[p].getAttribute("data-validation-required");
              
              }
          }
          
          if (formInputs[p].getAttribute("data-validation-email") != null && isValid){

              if (value.indexOf("@") == -1) //customize your validation here
              {
                  isValid = false;
                  msgValidation[p] = formInputs[p].getAttribute("data-validation-email");
              }

          }    

          this.setState({

            formIsValid : isValid
          })
          
          if (!isValid)
          {
              formInputs[p].classList.add("is-invalid");

              if (setfocus){
                 formInputs[p].focus();
              }
              
              this.setState({
                validation: msgValidation
              });

              return;

          }

      }

  }

  inputOnChange(e) {

    this.state.form[e.target.id] = e.target.value;
    
    this.setState({
      form:this.state.form
    });
  }

  submit(){

    this.validation(this.refs, true);

    if (this.state.formIsValid)
    {
       alert("bye bye...");
    }

  }


  render() {

    console.log("render");

    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">React Form Validation</a>
        </nav>

        <div className="row justify-content-md-center mt-5">
          <div className="col col-lg-8">
            <form>
              <div className="form-group">
                <label htmlFor="fistName">Nome*</label>
                <input type="text" 
                      ref="nome" 
                      data-validation-required="O nome é requerido."
                      className="form-control" 
                      id="nome" placeholder="" onChange={evt => this.inputOnChange(evt)} />
                <div className="invalid-feedback">{this.state.validation.nome}</div>
              </div>

              <div className="form-group">
                <label htmlFor="fistName">E-mail*</label>
                <input type="email" 
                    ref="email" 
                    data-validation-required="O e-mail é requerido."
                    data-validation-email="O e-mail é inválido."
                    className="form-control" id="email" placeholder="" onChange={evt => this.inputOnChange(evt)} />
                <div className="invalid-feedback">{this.state.validation.email}</div>

              </div>

              <div className="form-group">
                <label htmlFor="fistName">Telefone</label>
                <input type="text" className="form-control" id="telefone" placeholder="" onChange={evt => this.inputOnChange(evt)} />
              </div>

              <button type="button" className="btn btn-primary" onClick={this.submit.bind(this)}>Enviar</button>

            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
