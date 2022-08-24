import {Component} from 'react'

import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogsList extends Component {
  state = {blogData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    console.log(data)
    const updateData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      avatarUrl: eachItem.avatar_url,
      imageUrl: eachItem.image_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    console.log(updateData)
    this.setState({blogData: updateData, isLoading: false})
  }

  render() {
    const {blogData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
