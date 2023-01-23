import { useEffect, useState } from "react";
import useClassNames from "Hooks/useClassNames";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import PageContainer from "Components/Containers/PageContainer/PageContainer";
import TextCombo, { TextComboChangeEvent } from "Components/Input/TextCombo/TextCombo";

import type { Page } from "OldTypes/UI/Components";
import { TextComboStates } from "OldTypes/Enums";

interface AddFriendsPageProps extends Page {
  onAddFriend?: (recipient: string) => Promise<0 | 1 | 2>
}

function AddFriendsPage(props: AddFriendsPageProps) {
  const Localizations_AddFriendsPage = useTranslation("AddFriendsPage").t;
  const classNames = useClassNames("AddFriendsPageContainer", props.className);

  const [RecipientFieldErrorState, setRecipientFieldErrorState] = useState(-1);
  const [RecipientField, setRecipientField] = useState("");

  useEffect(() => {
    if (props.sharedProps && props.sharedProps.changeTitleCallback) props.sharedProps.changeTitleCallback(Localizations_AddFriendsPage("PageTitle"));
  });

  const handleRecipientFieldChanged = (event: TextComboChangeEvent) => {
    if (event.value !== undefined) {
      setRecipientField(event.value);
      setRecipientFieldErrorState(-1);
    }
  };

  const addFriend = () => {
    if (RecipientField.length > 0 && props.onAddFriend !== undefined) {
      props.onAddFriend(RecipientField).then((result) => {
        setRecipientFieldErrorState(result);

        if (result === 0) {
          setRecipientField("");
          return;
        }
      });
    }
  };

  const errorText = () => {
    switch (RecipientFieldErrorState) {
      case 0:
        return Localizations_AddFriendsPage("TextField_StatusText__RecipientField-Success");
      case 1:
        return Localizations_AddFriendsPage("TextField_StatusText__RecipientField-FriendNotFound");
      case 2:
        return Localizations_AddFriendsPage("TextField_StatusText__RecipientField-InvalidFormat");
      case -1:
      default:
        return "";
    }
  }

  return (
    <PageContainer className={classNames} adaptive={false}>
      <Typography variant="body1">{Localizations_AddFriendsPage("Typography-AddFriendBlurb")}</Typography>
      <div className="AddFriendContainer">
        <TextCombo submitButton={false} autoFocus status={RecipientFieldErrorState > 0 ? TextComboStates.Error : (RecipientFieldErrorState === 0) ? TextComboStates.Success : TextComboStates.Neutral} statusText={errorText()} value={RecipientField} placeholder={Localizations_AddFriendsPage("TextField_Placeholder-FriendFormat")} onChange={handleRecipientFieldChanged} onSubmit={addFriend} childrenRight={
          <Button className="AddFriendButton" onClick={addFriend} disabled={RecipientField.length < 1} variant="contained">{Localizations_AddFriendsPage("Button_Label-AddFriend")}</Button>
        }/>
      </div>
    </PageContainer>
  );
}

export default AddFriendsPage;
