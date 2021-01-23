import Avatar from 'react-avatar';


export default function BoardMemberImg({ member }) {

    return (
        //  <div className="task-member-img"><img className="task-member-preview-img" src={member?.imgUrl} /></div>
        <Avatar className="task-member-preview-img" name={member.fullname.toUpperCase()} size="30" textSizeRatio={1.75} fgColor='#fff' round={true} src={member.imgUrl} />
    )


}