import { deleteMember } from './memberData';
import { deleteTeam, getMembersByTeam, getSingleTeam } from './teamData';

// GETS MEMBERS ON SINGLE TEAM
const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getMembersByTeam(teamFirebaseKey)])
    .then(([teamObj, teamMembersArray]) => {
      resolve({ ...teamObj, members: teamMembersArray });
    }).catch((error) => reject(error));
});

// DELETES TEAM AND TEAM MEMBERS
const deleteTeamMembers = (teamFirebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(teamFirebaseKey).then((teamObj) => {
    getMembersByTeam(teamObj.firebaseKey)
      .then((membersArray) => {
        const deleteMemberPromises = membersArray.map((member) => deleteMember(member.firebaseKey));
        Promise.all(deleteMemberPromises).then(() => {
          deleteTeam(teamFirebaseKey).then(resolve);
        });
      });
  }).catch((error) => reject(error));
});

export { viewTeamDetails, deleteTeamMembers };
