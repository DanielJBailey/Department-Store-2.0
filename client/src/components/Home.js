import React, {Component} from 'react';
import axios from 'axios';
import DepartmentList from './DepartmentList';

class Home extends Component {
    state = {
        departments: [],
        cart: []
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    componentDidMount() {
        axios.get('/api/departments')
        .then(res => {
            this.setState({
                departments: res.data
            })
        })
    }

    render() {
        let {departments} = this.state;
        return(
            <>
                <DepartmentList departments={departments}/>
            </>
        )
    }
}


export default Home;