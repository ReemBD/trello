export default function BoardMemberImg({ member }) {
    return <div className="task-member-img"><img className="task-member-preview-img" src={member?.imgUrl} /></div>
}