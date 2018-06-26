import React from "react"
import {
  FormComponentType,
  InputValues,
  ModalType,
  SubmitHandler,
} from "../Types"
import { MobileForgotPasswordForm } from "./ForgotPasswordForm"
import { MobileLoginForm } from "./LoginForm"
import { MobileSignUpForm } from "./SignUpForm"

interface Props {
  type: ModalType
  values?: InputValues
  handleSubmit: SubmitHandler
  redirectUrl?: string
}

interface State {
  type?: ModalType
}

export class FormSwitcher extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    values: {},
  }

  state = {
    type: this.props.type,
  }

  presentModal = (newType: ModalType) => {
    this.setState({ type: newType })
  }

  render() {
    let Form: FormComponentType
    switch (this.state.type) {
      case ModalType.login:
        Form = MobileLoginForm
        break
      case ModalType.signup:
        Form = MobileSignUpForm
        break
      case ModalType.forgot:
        Form = MobileForgotPasswordForm
        break
      default:
        throw new Error(`${this.state.type} mode needs a component`)
    }

    const { values } = this.props
    const defaultValues = {
      email: values.email || "",
      password: values.password || "",
      name: values.name || "",
      accepted_terms_of_service: values.acceptedTermsOfService || false,
    }

    return (
      <Form
        values={defaultValues}
        handleTypeChange={type => this.presentModal(type)}
        handleSubmit={this.props.handleSubmit}
      />
    )
  }
}
