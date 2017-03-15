import React from 'react';
import ReactDOM from 'react-dom';
import * as action from '../action/action.js';
import './index.scss';

const MOUNT_NODE = document.getElementById('app')

class Title extends React.Component{
	constructor() {
		super();
		this.state = {
			loading: true,
			data: null,
		};
	}

	getArticle() {
		fetch('http://localhost:8080/api/article/list?pagesize=0&pagenum=4')
    	.then(function(response) {
	        if (response.status >= 400) {
	            throw new Error("Bad response from server");
	        }
        	return response.json();
	    })
	    .then((res) => {
	    	//console.log(res);
	    	this.setState({
	    		data: res,
	    		loading: false
	    	});
	    });
	}

	handleClick(){
		console.log('click');
	}

	handleMore(){

	}

	componentWillMount(){
		this.getArticle();
	}

	componentDidMount() {
		console.log(3);
	}
	
	render(){
		var list = this.state.data;
		console.log('hello world');
		console.log(list);
		var loading = this.state.loading;
		var myDate = new Date();
		if (loading) {
			return <sapn>努力加载中...</sapn>
		}

		return (
			<div className="index">
				<div className="index-nav">
					<div className="index-wrap">
						<a href="http://www.baidu.com" className="logo" role="logo">
							<h1>韩Sir头条</h1>
						</a>
					</div>
					<div>
						<ul className="index-ul">
							<li className="index-li"><a href="www.baidu.com">首页</a></li>
							<li className="index-li"><a href="www.baidu.com">文章</a></li>
							<li className="index-li"><a href="www.baidu.com">搜索</a></li>
							<li className="index-li"><a href="www.baidu.com">测试</a></li>
						</ul>
					</div>
				</div>
				<div className="index-list">
					<div className="list-title">最新文章 <small>{myDate.getFullYear()}-{myDate.getMonth()}-{myDate.getDate()}</small></div>
					<ul className="list-content">
					{
						list && list.length ? list.map((value, key) => (
								<li key={key}>
									<a href={value.out_url}>
										<p>{value.Title}</p>
									</a>
								</li>
							)) : <li>没有数据啦</li>
					}
					</ul>
				</div>
				
				<div className="index-more" onClick={this.handleMore}>
					查看更多
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Title />,
	MOUNT_NODE
);