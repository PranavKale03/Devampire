import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";

import './HomeMainbar.css'
import QuestionList from './QuestionList'

const HomeMainbar = () => {

  // var questionsList = [{
  //   id: 1,
  //   upVotes: 3,
  //   downVotes: 2,
  //   noOfAnswers: 2,
  //   questionTitle: 'What is function?',
  //   questionBody: 'It meant to be',
  //   questionTags: ['java', 'node js', 'react js', 'mongodb'],
  //   userPosted: 'Pranav',
  //   userId: 1,
  //   askedOn: 'Jan 1',
  //   answer: [{
  //     answerBody: 'Answer',
  //     userAnswered: 'Pranav',
  //     answeredOn: 'Jan 2',
  //     userId: 2,
  //   }]
  // },{
  //   id: 2,
  //   upVotes: 2,
  //   downVotes: 1,
  //   noOfAnswers: 2,
  //   questionTitle: 'What is function?',
  //   questionBody: 'It meant to be',
  //   questionTags: ['javascript', 'R', 'Python'],
  //   userPosted: 'Pranav',
  //   userId: 1,
  //   askedOn: 'Jan 1',
  //   answer: [{
  //     answerBody: 'Answer',
  //     userAnswered: 'Pranav',
  //     answeredOn: 'Jan 2',
  //     userId: 2,
  //   }]
  // },{
  //   id: 3,
  //   upVotes: 4,
  //   downVotes: 2,
  //   noOfAnswers: 1,
  //   questionTitle: 'What is function?',
  //   questionBody: 'It meant to be',
  //   questionTags: ['java', 'node js', 'react js', 'mongodb'],
  //   userPosted: 'Pranav',
  //   userId: 1,
  //   askedOn: 'Jan 1',
  //   answer: [{
  //     answerBody: 'Answer',
  //     userAnswered: 'Pranav',
  //     answeredOn: 'Jan 2',
  //     userId: 2,
  //   }]
  // }]

  const location = useLocation()
  const user = 1;
  const navigate = useNavigate()

  const questionsList = useSelector((state) => state.questionsReducer);

  const checkAuth = () => {
    if(user === null){
      alert('Login or signup to ask a question')
      navigate('/Auth')
    }else{
      navigate('./AskQuestion')
    }
  }

  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {
          location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
        }
        <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
      </div>
      <div>
        {
          questionsList.data === null ?
          <h1>Loading...</h1> :
          <>
            <p>{ questionsList.data.length } questions</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar