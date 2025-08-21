import React from "react";

import SwitchTabs from "@/components/SwitchTabs";

import i18n from "@/i18n";

type PropTypes = {
  activeTab: number;
  setActiveTab: (index: number) => void;
};

const Tabs = ({ activeTab, setActiveTab }: PropTypes) => {
  const tabs = [
    i18n.t("recommended.solo_trips"),
    i18n.t("recommended.family_trips"),
  ];

  return (
    <SwitchTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
  );
};

export default Tabs;
