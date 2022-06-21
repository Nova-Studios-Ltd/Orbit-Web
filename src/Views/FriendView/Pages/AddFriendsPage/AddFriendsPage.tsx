import useClassNames from "Hooks/useClassNames";
import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import PageContainer from "Components/Containers/PageContainer/PageContainer";
import TextCombo, { TextComboChangeEvent } from "Components/Input/TextCombo/TextCombo";

import type { Page } from "DataTypes/Components";
import { useEffect, useState } from "react";

interface AddFriendsPageProps extends Page {
  onChannelCreate?: (recipient: string) => void,
}

function AddFriendsPage(props: AddFriendsPageProps) {
  const Localizations_AddFriendsPage = useTranslation("AddFriendsPage").t;
  const classNames = useClassNames("AddFriendsPageContainer", props.className);

  const [RecipientField, setRecipientField] = useState("");

  useEffect(() => {
    if (props.sharedProps && props.sharedProps.changeTitleCallback) props.sharedProps.changeTitleCallback(Localizations_AddFriendsPage("PageTitle"));
  }, [Localizations_AddFriendsPage, props, props.sharedProps?.changeTitleCallback]);

  const handleRecipientFieldChanged = (event: TextComboChangeEvent) => {
    if (event.value) setRecipientField(event.value);
  };

  const createChannel = () => {
    if (props.onChannelCreate) {
      props.onChannelCreate(RecipientField);
    }
  };

  return (
    <PageContainer className={classNames} adaptive={false}>
      <div className="CreateChannelContainer">
        <TextCombo submitButton={false} value={RecipientField} onChange={handleRecipientFieldChanged} onSubmit={createChannel} childrenRight={
          <Button onClick={createChannel} variant="outlined">{Localizations_AddFriendsPage("Button_Label-AddFriend")}</Button>
        }/>
      </div>
    </PageContainer>
  );
}

export default AddFriendsPage;
