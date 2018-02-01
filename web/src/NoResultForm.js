import styled from "styled-components";

const SubmitButton = styled.button`
  font-size: 1.2em;
  border-radius: 2px;
  padding: 10px 20px;
`;

const SubmitTextarea = styled.textarea`
  font-size: 1.2em;
  width: 80%;
  height: 100px;
  margin: 0 auto;
  padding: 10px;
`;

const SubmitInput = styled.input`
  width: 80%;
  margin: 0 auto;
  font-size: 1.2em;
  padding: 10px;
`;

class NoResultForm extends React.Component {
  state = {
    status: null,
    message: "",
    email: ""
  };
  send = () => {
    this.setState(
      {
        status: "loading"
      },
      () => {
        fetch("https://formspree.io/julien@bouquillon.com", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            message: this.state.message,
            email: this.state.email
          })
        })
          .then(() => {
            this.setState({
              status: "sent",
              message: "",
              email: ""
            });
          })
          .catch(() => {
            this.setState({
              status: "error"
            });
          });
      }
    );
  };
  render() {
    const buttonMessage = {
      default: "Soumettre la question",
      sent: "Votre demande a bien été envoyée, merci !",
      loading: "Envoi en cours....",
      error: "Impossible d'envoyer votre message......."
    }[this.state.status || "default"];
    return (
      <div style={{ textAlign: "center", fontSize: "1.5em" }}>
        <p>Aucun résultat 😢</p>
        <p>Soumettez votre question à nos services :</p>
        <SubmitTextarea
          value={this.state.message}
          onChange={e => this.setState({ status: "", message: e.target.value })}
          placeholder="Votre question"
        />
        <p>Recevez la réponse par email:</p>
        <SubmitInput
          value={this.state.email}
          type="email"
          onChange={e => this.setState({ status: "", email: e.target.value })}
          placeholder="Votre email"
        />
        <br />
        <br />
        <SubmitButton
          onClick={this.send}
          disabled={!this.state.message || !this.state.email || (this.state.status && this.state.status !== "error")}
        >
          {buttonMessage}
        </SubmitButton>
      </div>
    );
  }
}

export default NoResultForm;
