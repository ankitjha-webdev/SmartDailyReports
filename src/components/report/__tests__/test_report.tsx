import * as React from "react";
import { Report } from "../component";
import renderer from "react-test-renderer";

it("component renders", () => {
    const tree = renderer.create(<Report />).toJSON();
    expect(tree).toMatchSnapshot();
});
