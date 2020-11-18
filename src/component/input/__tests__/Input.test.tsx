import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Input from "../Input";

describe("Input", () => {

  const props = {
    label: "Ajouter un commentaire",
    handleChange: () => {},
    handleBlur: () => {},
    values: { description :''},
    errors: { description :''},
    touched: { description :''},
    style: { margin: 8 },
    variables: {
      description: "description",
    },
  };

  it("should display snapshot with Ajouter un commentaire", () => {
    const tree = renderer.create(<Input {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display snapshot with Modifier ton commentaire", () => {
    props.label = "Modifier ton commentaire"
    const tree = renderer.create(<Input {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display Modifier ton commentaire", () => {
    const wrapper = mount(<Input {...props} />);
    expect(wrapper.text()).toContain("Modifier ton commentaire");
  });
});