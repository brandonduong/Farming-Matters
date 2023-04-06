import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Consultant from './Consultant';
import OtherAvatar from './OtherAvatar';
import AvatarDialog from './AvatarDialog';
import { avatarNames, avatarDescription } from '../GameLogic/constants';

// TODO: Prevent other modules from accessing certain props elements such as (INFOMRATION HIDING)
const Avatar = (props) => {
  const [id, setId] = useState(props.avatarID);
  const [name, setName] = useState(avatarNames[props.avatarID][0]);
  const [role, setRole] = useState(avatarNames[props.avatarID][1]);
  const [description, setDescription] = useState(
    avatarDescription[props.avatarID],
  );
  const [statement, setStatement] = useState('');
  const [avatarType, setAvatarType] = useState(props.getAvatarType);

  function getId() {
    return id;
  }
  function getName() {
    return name;
  }
  function getRole() {
    return role;
  }
  function getDescription() {
    return description;
  }
  function getStatement() {
    return statement;
  }
  function getAvatarType() {
    return avatarType;
  }
  return (
    <div>
      {props.avatarID === 0 ? (
        <Consultant
          getId={getId}
          setId={setId}
          getName={getName}
          setName={props.consultantStatement}
          getRole={getRole}
          setRole={setRole}
          getDescription={getDescription}
          setDescription={setDescription}
          getStatement={getStatement}
          setStatement={setStatement}
          getAvatarType={getAvatarType}
          setAvatarType={setAvatarType}
          {...props}
        />
      ) : (
        <OtherAvatar
          getId={getId}
          setId={setId}
          getName={getName}
          setName={setName}
          getRole={getRole}
          setRole={setRole}
          getDescription={getDescription}
          setDescription={setDescription}
          getStatement={getStatement}
          setStatement={setStatement}
          getAvatarType={getAvatarType}
          setAvatarType={setAvatarType}
          {...props}
        />
      )}
    </div>
  );
};

export default Avatar;
