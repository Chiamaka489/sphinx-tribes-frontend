import { EuiText } from '@elastic/eui';
import MaterialIcon from '@material/react-material-icon';
import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { LazyImg } from '../components/common';
import { useStores } from '../store';
import { colors } from '../config/colors';
import { BountiesProfileProps } from './interfaces';

interface BountyProfileViewProps {
  name_text_color?: string;
  View_profile_text_color?: string;
  View_profile_icon_color?: string;
}

interface IUserProfileContainer {
  isBountyLandingPage?: boolean;
}

const UserProfileContainer = styled.div<IUserProfileContainer>`
  min-width: 336px;
  max-width: 336px;
  display: flex;
  padding: ${(props: any) =>
    props.isBountyLandingPage ? '40px 0px 0px 20px' : '40px 0px 0px 37px'};
  margin-left: ${(props: any) => (props.isBountyLandingPage ? '-10px' : '0')};
`;

const UserImage = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 200px;
  overflow: hidden;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  margin-top: 3px;
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  .statusText {
    color: #ffffff;
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 700;
    font-size: 8px;
    line-height: 10px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const NameContainer = styled.div<BountyProfileViewProps>`
  width: 100%;
  height: 32px;
  font-family: 'Barlow';
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 23px;
  display: flex;
  align-items: center;
  color: #3c3f41;
  margin-top: 3px;
  margin-bottom: 1px;
  .Name_Text {
    white-space: nowrap;
    overflow: hidden;
    font-size: 17px;
    font-weight: 600;
    width: 150px;
    text-overflow: ellipsis;
    color: ${(p: any) => p.name_text_color};
  }
`;

const ViewProfileButton = styled.div<BountyProfileViewProps>`
  height: 20px;
  width: 92px;
  left: 909px;
  top: 96px;
  display: flex;
  flex-direction: row;
  .text {
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: ${(p: any) => p.View_profile_text_color};
  }
  .Icon_Container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 24px;
  }
  .MaterialIcon {
    color: ${(p: any) => p.View_profile_icon_color};
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.01em;
  }
`;
const BountyProfileView = (props: BountiesProfileProps) => {
  const color = colors['light'];
  const { main } = useStores();
  return (
    <>
      <UserProfileContainer
        style={{
          ...props?.UserProfileContainerStyle
        }}
        isBountyLandingPage={props.isBountyLandingPage}
      >
        <UserImage
          style={{
            ...props.UserImageStyle
          }}
        >
          <LazyImg
            width={'100%'}
            height={'100%'}
            style={{ objectFit: 'cover' }}
            src={props.assignee?.img || main.getUserAvatarPlaceholder(props.assignee?.owner_pubkey)}
            alt={'assigned_person'}
          />
        </UserImage>
        <UserInfo
          style={{
            ...props.userInfoStyle
          }}
        >
          <Status
            style={{
              ...props?.statusStyle
            }}
          >
            <EuiText className="statusText">{props?.status}</EuiText>
          </Status>
          <NameContainer
            name_text_color={color.grayish.G10}
            style={{
              cursor: props.isNameClickable ? 'pointer' : '',
              ...props.NameContainerStyle
            }}
            onClick={(e: any) => {
              if (props.isNameClickable && { ...props.assignee }.owner_alias) {
                e.stopPropagation();
                window.open(
                  `/p/${
                    {
                      ...props.assignee
                    }.uuid
                  }?widget=bounties`,
                  '_blank'
                );
              }
            }}
          >
            <EuiText className="Name_Text">
              {{ ...props.assignee }.owner_alias || 'Guest Developer  '}
            </EuiText>
          </NameContainer>
          {props.canViewProfile && (
            <ViewProfileButton
              View_profile_text_color={color.grayish.G300}
              View_profile_icon_color={color.grayish.G300}
              onClick={(e: any) => {
                if ({ ...props.assignee }.owner_alias) {
                  e.stopPropagation();
                  window.open(
                    `/p/${
                      {
                        ...props.assignee
                      }.uuid
                    }?widget=bounties`,
                    '_blank'
                  );
                }
              }}
            >
              <EuiText className="text">View Profile</EuiText>
              <div className="Icon_Container">
                <MaterialIcon icon={'arrow_forward'} className="MaterialIcon" />
              </div>
            </ViewProfileButton>
          )}
        </UserInfo>
      </UserProfileContainer>
    </>
  );
};

export default observer(BountyProfileView);
