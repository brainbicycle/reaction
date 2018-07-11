import Icon from "Components/Icon"
import { mount } from "enzyme"
import React from "react"
import { ModalHeader } from "../ModalHeader"

describe("ModalHeader", () => {
  const getWrapper = props => {
    return mount(<ModalHeader {...props} />)
  }
  let props
  beforeEach(() => {
    props = {
      hasLogo: false,
      title: "Log In",
    }
  })

  it("Renders title if present", () => {
    const component = getWrapper(props)
    expect(component.html()).toMatch("Log In")
    expect(component.find(Icon)).toHaveLength(0)
  })

  it("Renders logo if present", () => {
    props.hasLogo = true
    const component = getWrapper(props)
    expect(component.find(Icon)).toHaveLength(1)
  })
})
