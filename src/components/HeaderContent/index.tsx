import { Select } from 'antd';
import RightContent from '../RightContent';
import LeftContent from '../LeftContent';
var myStyle = {
    color: '#FF0000'
};
var divStyle = {
    display: 'flex',
    color: 'white'
};

const Header: React.FC = () => {
    return (
        <div style={divStyle}>
            <LeftContent />
            <RightContent />
        </div>
);
};

export default Header;