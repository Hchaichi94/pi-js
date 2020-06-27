import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import { logout } from '../../redux/user/userActions'
import { Redirect } from 'react-router-dom'

class DefaultHeader extends Component {
  constructor() {
    super()
    this.state = {
      msg: '',
      redirectTo: false,
      is: true
    }
  }

  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }
  onSubmit = e => {
    this.props.logout()
    this.setState({
      redirectTo: true
    })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to="/" />
    }
    const { user } = this.props.user
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
        </Nav>
        <span className='navbar-text mr-3'>
          <strong>{user ? `Welcome ${user.First_name} ${user.Last_name}` : ''}</strong>
        </span>
        <Nav className="ml-auto" navbar>

          <UncontrolledDropdown nav direction="down">
            {user.picture !== null ?
              <DropdownToggle nav>
                <img src={user.picture} className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              : null
            }

            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong>
              </DropdownItem>
              <DropdownItem ><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem ><i className="fa fa-user"></i><Link to="/Profile">Profile</Link></DropdownItem>
              <DropdownItem onClick={this.onSubmit}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { logout })(DefaultHeader);
