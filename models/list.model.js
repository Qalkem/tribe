const db = require('./db')
const helper = require('./helper')

module.exports.get = async function () {
  const rows = await db.query(
    `SELECT 
    member.memberId as memberId,
    member.type as memberType,
    member.nickname as memberNickname,
    member.name as memberName,
    member.prefix as memberPrefix,
    member.surname as memberSurname,
    member.avatar as memberAvatar,
    member.githubHandle as memberGithubHandle,
    member.bio as memberBio,
    member.url as memberUrl,
    
    squad.squadId as squadId,
    squad.name as squadName,
    squad.description as squadDesription,
    squad.avatar as squadAvatar,
    squad.url as squadUrl,

    tribe.tribeId as tribeId,
    tribe.name as tribeName,
    tribe.cohort as tribeCohort,
    tribe.description as tribeDescription,
    tribe.avatar as tribeAvatar,
    tribe.url as tribeUrl,
    
    team.teamId as teamId,
    team.name as teamName,
    team.description as teamDescription,
    team.avatar as teamAvatar,
    team.url as teamUrl
  FROM member 
    LEFT JOIN squad ON member.squadId = squad.squadId
    LEFT JOIN tribe ON squad.tribeId = tribe.tribeId
    LEFT JOIN team_member ON member.memberId = team_member.memberId
    LEFT JOIN team ON team_member.teamId = team.teamId`
  )

  return {
    data: helper.emptyOrRows(rows),
    meta: {},
  }
}
