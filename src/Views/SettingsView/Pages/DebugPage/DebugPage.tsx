import { Button } from "@mui/material";
import useClassNames from "Hooks/useClassNames";
import { useTranslation } from "react-i18next";

import { useDispatch } from "Redux/Hooks";
import { clearParams } from "Redux/Slices/RouteSlice";

import { Flags, HasUrlFlag } from "Lib/Debug/Flags";

import PageContainer from "Components/Containers/PageContainer/PageContainer";
import Section from "Components/Containers/Section/Section";
import DebugConsoleCanvas from "Components/Debug/DebugConsoleCanvas/DebugConsoleCanvas";
import SystemFlags from "Components/Debug/SystemFlags/SystemFlags";
import NetworkDiag from "Views/SettingsView/Pages/DashboardPage/DebugTools/NetworkDiagnostics";

import type { Page } from "Types/UI/Components";

interface DebugPageProps extends Page {

}

function DebugPage(props: DebugPageProps) {
  const Localizations_DebugPage = useTranslation("DebugPage").t;
  const classNames = useClassNames("DebugPageContainer", props.className);
  const dispatch = useDispatch();

  return (
    <PageContainer className={classNames} noPadding>
      <Section title={Localizations_DebugPage("Section_Title-Diagnostics")}>
        <NetworkDiag showAdvanced={HasUrlFlag(Flags.EnableSocketControls)}/>
      </Section>
      <Section title={Localizations_DebugPage("Section_Title-Flags")} childrenRight={
        <Button onClick={() => dispatch(clearParams())}>{Localizations_DebugPage("Button_Label-ClearAllFlags")}</Button>
      }>
        <SystemFlags/>
      </Section>
      <Section title={Localizations_DebugPage("Section_Title-Console")}>
        <DebugConsoleCanvas />
      </Section>
    </PageContainer>
  );
}

export default DebugPage;
