import { Select } from 'antd';
import RightContent from '../RightContent';
var myStyle = {
    color: '#FF0000'
};
var divStyle = {
    display: 'flex',
    color: 'white'
};

const Header: React.FC = () => {
    console.log('Header.....')
    return (
        <div style={divStyle}>
            <RightContent />
        </div>
);
};

export default Header;