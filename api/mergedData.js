import { deleteMember, getSingleMember } from './memberData';
import { deleteTeam, getMembersByTeam, getSingleTeam } from './teamData';

const viewMemberTeam = (memberFirebaseKey) => new Promise((resolve, reject) => {
  getSingleMember(memberFirebaseKey)
    .then((memberObj) => {
      getSingleTeam(memberObj.team_id)
        .then((teamObj) => {
          resolve({ teamObj, ...memberObj });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getMembersByTeam(teamFirebaseKey)])
    .then(([teamObj, teamMembersArray]) => {
      resolve({ ...teamObj, members: teamMembersArray });
    }).catch((error) => reject(error));
});

const deleteTeamMembers = (teamId) => new Promise((resolve, reject) => {
  getSingleTeam(teamId).then((membersArray) => {
    console.warn(membersArray);
    const deleteMemberPromises = membersArray.map((member) => deleteMember(member.firebaseKey));
    Promise.all(deleteMemberPromises).then(() => {
      deleteTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewTeamDetails, viewMemberTeam, deleteTeamMembers };
