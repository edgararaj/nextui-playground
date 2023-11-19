// import classNames from 'classnames';
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Button from "./Button";
import NativeCheckbox from "./NativeCheckbox";
import iconsShape from "./shapes/iconsShape";
import languageShape from "./shapes/languageShape";

// import * as Collapsible from "@radix-ui/react-collapsible";
// import { ChevronRightIcon, DividerHorizontalIcon, CheckIcon } from "@radix-ui/react-icons";
// import * as Checkbox from "@radix-ui/react-checkbox";
import { Accordion, AccordionItem, Checkbox, cn } from "@nextui-org/react";

class TreeNode extends React.PureComponent {
  static propTypes = {
    checked: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    expandDisabled: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
    icons: iconsShape.isRequired,
    isLeaf: PropTypes.bool.isRequired,
    isParent: PropTypes.bool.isRequired,
    label: PropTypes.node.isRequired,
    lang: languageShape.isRequired,
    optimisticToggle: PropTypes.bool.isRequired,
    showNodeIcon: PropTypes.bool.isRequired,
    treeId: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onCheck: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,

    children: PropTypes.node,
    className: PropTypes.string,
    expandOnClick: PropTypes.bool,
    icon: PropTypes.node,
    showCheckbox: PropTypes.bool,
    title: PropTypes.string,
    onClick: PropTypes.func,
    depth: PropTypes.number,
  };

  static defaultProps = {
    children: null,
    className: null,
    expandOnClick: false,
    icon: null,
    showCheckbox: true,
    title: null,
    onClick: null,
    depth: 0,
  };

  constructor(props) {
    super(props);

    this.onCheck = this.onCheck.bind(this);
    this.onCheckboxKeyPress = this.onCheckboxKeyPress.bind(this);
    this.onCheckboxKeyUp = this.onCheckboxKeyUp.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onExpand = this.onExpand.bind(this);

    this.setExpanded = this.setExpanded.bind(this);
    this.state = {
      expanded: !props.isLeaf && props.expanded,
    };
  }

  setExpanded(expanded) {
    this.setState({ expanded });

    // if (!expanded) {
    //     setTimeout(this.onExpand, 700)
    // } else {
    //     this.onExpand()
    // }
  }

  onCheck() {
    const { value, onCheck } = this.props;

    onCheck({ value, checked: this.getCheckState({ toggle: true }) });
  }

  onCheckboxKeyPress(event) {
    const { which } = event;

    // Prevent browser scroll when pressing space on the checkbox
    if (which === 32) {
      event.preventDefault();
    }
  }

  onCheckboxKeyUp(event) {
    const { keyCode } = event;

    if ([13, 32].includes(keyCode)) {
      this.onCheck();
    }
  }

  onClick() {
    const { expandOnClick, isParent, value, onClick } = this.props;

    // Auto expand if enabled
    if (isParent && expandOnClick) {
      this.onExpand();
    }

    onClick({ value, checked: this.getCheckState({ toggle: false }) });
  }

  onExpand() {
    const { expanded, value, onExpand } = this.props;

    onExpand({ value, expanded: !expanded });
  }

  getCheckState({ toggle }) {
    const { checked, optimisticToggle } = this.props;

    // Toggle off state to checked
    if (checked === 0 && toggle) {
      return true;
    }

    // Node is already checked and we are not toggling
    if (checked === 1 && !toggle) {
      return true;
    }

    // Get/toggle partial state based on cascade model
    if (checked === 2) {
      return optimisticToggle;
    }

    return false;
  }

  renderCollapseButton() {
    const { expandDisabled, isLeaf, lang } = this.props;

    if (isLeaf) {
      return (
        <span className="rct-collapse">
          <span className="rct-icon" />
        </span>
      );
    }

    return (
      <Button
        className="rct-collapse rct-collapse-btn"
        disabled={expandDisabled}
        title={lang.toggle}
        onClick={this.onExpand}
      >
        {this.renderCollapseIcon()}
      </Button>
    );
  }

  renderCollapseIcon() {
    const {
      expanded,
      icons: { expandClose, expandOpen },
    } = this.props;

    if (!expanded) {
      return expandClose;
    }

    return expandOpen;
  }

  renderCheckboxIcon() {
    const {
      checked,
      icons: { uncheck, check, halfCheck },
    } = this.props;

    if (checked === 0) {
      return uncheck;
    }

    if (checked === 1) {
      return check;
    }

    return halfCheck;
  }

  renderNodeIcon() {
    const {
      expanded,
      icon,
      icons: { leaf, parentClose, parentOpen },
      isLeaf,
    } = this.props;

    if (icon !== null) {
      return icon;
    }

    if (isLeaf) {
      return leaf;
    }

    if (!expanded) {
      return parentClose;
    }

    return parentOpen;
  }

  renderBareLabel(children) {
    const { onClick, title } = this.props;
    const clickable = onClick !== null;

    return (
      <span className="rct-bare-label" title={title}>
        {clickable ? (
          <span
            className="rct-node-clickable"
            role="button"
            tabIndex={0}
            onClick={this.onClick}
            onKeyPress={this.onClick}
          >
            {children}
          </span>
        ) : (
          children
        )}
      </span>
    );
  }

  renderCheckboxLabel(children) {
    const { checked, disabled, title, treeId, value, onClick } = this.props;
    const clickable = onClick !== null;
    const inputId = `${treeId}-${String(value).split(" ").join("_")}`;

    const render = [
      <label key={0} htmlFor={inputId} title={title}>
        <NativeCheckbox
          checked={checked === 1}
          disabled={disabled}
          id={inputId}
          indeterminate={checked === 2}
          onChange={() => {}}
          onClick={this.onCheck}
        />
        <span
          aria-checked={checked === 1}
          aria-disabled={disabled}
          aria-hidden="true"
          className="rct-checkbox"
          role="checkbox"
          tabIndex={0}
          onKeyPress={this.onCheckboxKeyPress}
          onKeyUp={this.onCheckboxKeyUp}
        >
          {this.renderCheckboxIcon()}
        </span>
        {!clickable ? children : null}
      </label>,
    ];

    if (clickable) {
      render.push(
        <span
          key={1}
          className="rct-node-clickable"
          role="button"
          tabIndex={0}
          onClick={this.onClick}
          onKeyPress={this.onClick}
        >
          {children}
        </span>
      );
    }

    return render;
  }

  renderLabel() {
    const { label, showCheckbox, showNodeIcon } = this.props;
    const labelChildren = [
      showNodeIcon ? (
        <span key={0} className="rct-node-icon">
          {this.renderNodeIcon()}
        </span>
      ) : null,
      <span key={1} className="rct-title">
        {label}
      </span>,
    ];

    if (!showCheckbox) {
      return this.renderBareLabel(labelChildren);
    }

    return this.renderCheckboxLabel(labelChildren);
  }

  renderChildren() {
    const { children, expanded } = this.props;

    // if (!expanded) {
    //     return null;
    // }

    return children;
  }

  render() {
    const {
      className,
      disabled,
      expanded,
      isLeaf,
      label,
      showCheckbox,
      showNodeIcon,
      checked,
      treeId,
      value,
      depth,
    } = this.props;
    // const nodeClass = classNames({
    //     'rct-node': true,
    //     'rct-node-leaf': isLeaf,
    //     'rct-node-parent': !isLeaf,
    //     'rct-node-expanded': !isLeaf && expanded,
    //     'rct-node-collapsed': !isLeaf && !expanded,
    //     'rct-disabled': disabled,
    // }, className);

    const classTextColor = `${
      value.charAt(0) == "1"
        ? "text-blue-500"
        : value.charAt(0) == "2"
        ? "text-emerald-500"
        : value.charAt(0) == "3"
        ? "text-violet-500"
        : "text-black"
    }`;

    const inputId = `${treeId}-${String(value).split(" ").join("_")}`;

    let rootClassName = "my-5";
    if (depth == 1) {
      rootClassName = "[&:not(:last-child)]:border-b first:mt-5";
    } else if (depth > 1) {
      if (isLeaf) {
        rootClassName = "my-1 ml-14";
      } else {
        rootClassName = "my-1";
      }
    }

    let headerClassName = `flex-1 ${
      !isLeaf ? "rounded-r" : "rounded border-l"
    } p-[8px] h-[45px] border-r border-y border-[#f3f4f6] bg-[#f9fafb] justify-between flex items-center`;
    if (depth > 0) {
      headerClassName = `flex-1 ${
        !isLeaf ? "rounded-r" : "rounded"
      } p-[8px] h-[45px] bg-white justify-between flex items-center`;
    }

    let triggerClassName =
      "bg-[#f9fafb] group rounded-l px-4 h-[45px] inline-flex items-center justify-center outline-none data-[state=closed]:border-[#f3f4f6] data-[state=open]:border-[#3b82f6] hover:bg-blue-50 border";
    if (depth > 0) {
      triggerClassName =
        "group rounded-l px-4 h-[45px] inline-flex items-center justify-center outline-none data-[state=closed]:border-[#f3f4f6] data-[state=open]:border-[#3b82f6] data-[state=closed]:border-white hover:bg-blue-50 border";
    }

    let chevronClassName =
      "text-black w-6 h-6 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-90";
    if (depth > 0) {
      chevronClassName =
        "text-black w-6 h-6 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-90";
    }

    const itemClasses = {
      base: "pt-2 w-full",
      title: "font-normal text-medium",
      trigger: `pr-2 py-0 data-[hover=true]:bg-default-100 rounded-lg flex items-center ${
        checked !== 0
          ? "data-[hover=true]:bg-primary-500/50 bg-primary-500/20"
          : ""
      }`,
      indicator: `text-medium ${checked !== 0 ? "text-primary-700" : ""}`,
      content: "text-small px-2 py-0",
    };

    const defaultContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    return (
      <Accordion showDivider={false} itemClasses={itemClasses}>
        <AccordionItem
          aria-label="Accordion 1"
          isDisabled={disabled}
          hideIndicator={isLeaf || disabled}
          startContent={
            <Checkbox
              classNames={{
                base: cn(
                  "inline-flex w-full max-w-md bg-transparent",
                  "items-center justify-start py-4",
                  "cursor-pointer rounded-lg gap-2 border-2 border-transparent"
                ),
                label: "w-full",
              }}
              isIndeterminate={checked === 2}
              isSelected={checked === 1}
              onValueChange={this.onCheck}
            >
              <p
                className={`whitespace-nowrap ${
                  checked !== 0 ? "text-primary-700" : ""
                }`}
              >
                {label}
              </p>
            </Checkbox>
          }
        >
          {this.renderChildren()}
        </AccordionItem>
      </Accordion>
    );
  }
}

export default TreeNode;
