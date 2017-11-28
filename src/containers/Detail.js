import React, { Component } from 'react'
import { Provider,connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import * as actions from '../actions'

export class Detail extends Component{
	componentDidMount(){
		const {setDetail,match,listState,emptyList}=this.props;
		const id=match.params.id;
		window.scrollTo(0,0);
		if(listState.length){
			setDetail(listState.filter(item=>item.id==id)[0]);
			emptyList();
		} else {
			firebase.database().ref('posts').orderByChild('id').equalTo(id).limitToFirst(1).once('value').then(function(snapshot) {
				for(let [key,val] of Object.entries(snapshot.val())){
					setDetail(val);
				}
			});
		}
	}

	showMore(evt){
		let actorsElem=this.refs.actors,
			list=Array.prototype.slice.call(actorsElem.children);
		list.forEach(item=>{
			item.style.display='inline';
		});
		evt.target.style.display='none';
	}
	
	render(){
		const obj=this.props.detailState;
		return(
			<CSSTransitionGroup component="div" transitionName="example" 
              transitionAppear={true}
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}
            >
			<div className="detail">
				<h2 className="detail-title">{obj.title} {obj.english_title}</h2>
				<div className="img-wrap">
					<img src={obj.cover} alt=""/>
				</div>
				<p className="rate">豆瓣评分: <i>{obj.rate}</i></p>
				<div className="info">
					<div>
						<span className="desc">导演: </span>
						<span>
						{
							obj.directors.map((item,index)=>{
								return <a key={index}>{item}{index < obj.directors.length-1?<i className="split"> / </i>:''}</a>
							})
						}
						</span>
					</div>
					<div>
						<span className="desc">主演: </span>
						<span ref="actors">
						{
							obj.actors.map((item,index)=>{
								return <a style={{display:index>4?'none':'inline'}} key={index}>{item}{index < obj.actors.length-1?<i className="split"> / </i>:''}</a>
							})
						}
						{obj.actors.length>4?<i className="more-a" onClick={this.showMore.bind(this)}>更多...</i>:''} 
						</span>
					</div>
					<div>
						<span className="desc">类型: </span>
						<span> 
						{
							obj.types.map((item,index)=>{ 
								return <a key={index}>{item}{index < obj.types.length-1?<i className="split"> / </i>:''}</a>
							})
						}
						</span>
					</div>
					<div>
						<span className="desc">制片国家/地区: </span><span>{obj.region}</span>
					</div>
					<div>
						<span className="desc">上映时间: </span><span>{obj.release_time}</span>
					</div>
					<div>
						<span className="desc">片长: </span><span>{obj.duration}</span>
					</div>
					<div className="comment">
						{obj.short_comment.content}
						<p className="author">- {obj.short_comment.author}</p>
					</div>
				</div>
			</div>
			</CSSTransitionGroup>
		)
	}
}

export default connect(
  (state) => { return{...state} },
  () => { return {...actions} }
)(Detail);

