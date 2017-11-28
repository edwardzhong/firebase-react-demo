import React, { Component } from 'react'
import { Provider,connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import * as actions from '../actions'
import List from '../components/List'

export class Home extends Component {
    componentDidMount(){
        const self=this;
        let id='',isLoad=false;

        window.onscroll=function(){
            let winHeight =  window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,
                scrollTop =  window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop,
                offsetTop = document.getElementsByTagName('footer')[0].offsetTop;
            if(winHeight+scrollTop+100>offsetTop){
                if(!isLoad) { getData(id);}
            }
        }

        function getData(key){
            isLoad=true;
            $('.overlay').show();
            firebase.database().ref('posts').orderByKey().startAt(key).limitToFirst(key?11:10).once('value').then(function(snapshot) {
                isLoad=false;
                $('.overlay').hide();
                for(let [k,val] of Object.entries(snapshot.val())){
                    if(key&&k==key) continue;
                    self.props.addList(val);
                    id=k;
                }
                self.props.sortByHot();
            });
        }
        window.scrollTo(0,1);
    }

    render() {
        const { listState,sortByHot,sortByTime,sortByRate } = this.props;
        return ( 
            <CSSTransitionGroup component="div" transitionName="example" 
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}
            >
                    <div className="sort-wrap">
                    <div><input type="radio" name="sort" onClick={sortByHot} defaultChecked id="hot" /><label htmlFor="hot"> 按热度排序: </label></div>
                    <div><input type="radio" name="sort" onClick={sortByTime} id="time" /><label htmlFor="time"> 按时间排序 </label></div>
                    <div><input type="radio" name="sort" onClick={sortByRate} id="rate" /><label htmlFor="rate"> 按评价排序 </label></div> 
                </div>
                <List filmList={listState} />
            </CSSTransitionGroup>
        )
    }
}

export default  connect(
  (state) => { return{...state} },
  () => { return {...actions} }
)(Home);
