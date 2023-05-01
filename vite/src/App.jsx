import { useEffect, useState } from 'react'

import styled from 'styled-components'

import img1 from './assets/PNG/frame-1.png'
import img2 from './assets/PNG/frame-2.png'
import img3 from './assets/PNG/frame-3.png'
import img4 from './assets/PNG/frame-4.png'
import img5 from './assets/PNG/frame-5.png'
import img6 from './assets/PNG/frame-6.png'
import img7 from './assets/PNG/frame-7.png'
import img8 from './assets/PNG/frame-8.png'

import './styles.css'





const birdSize = 45

let gameWidth = 500
let gameHeight = 500

let obstacleWidth = 50

let gravity = 5

let jumpHeight = 120

let gap = 200

let img

const images = [img1, img2, img3, img4, img5, img6, img7, img8]


function App() {

  const [birdPosition, setBirdPosition] = useState(250)
  const [gameStarted, setGameStarted] = useState(false)
  const [obstaclHeight, setObstacleHeight] = useState(100)
  const [obstacleLeft, setObstacleLeft] = useState(gameWidth - obstacleWidth)
  const [score, setScore] = useState(0)


  let bottomObstacleHeight = gameHeight - gap - obstaclHeight


  useEffect(() => {

    let timeid

    if(gameStarted && birdPosition < gameHeight - birdSize) {
      timeid = setInterval(() => {
        setBirdPosition(birdPosition => birdPosition + gravity)},24)
    }


      return () => {
        clearInterval(timeid)
      }
    }, [gameStarted, birdPosition])
    

  const handleCLick = () => {
    let newBirdPosition = birdPosition - jumpHeight
    if(!gameStarted) {
      setGameStarted(true)
      setScore(0)
    }
    if(newBirdPosition < 0) {
      setBirdPosition(0)
      
    }
    // console.log(img1)
    setBirdPosition(newBirdPosition)
  }

  useEffect(() => {
    let animationId
    if(gameStarted) {
      animationId = setInterval(() => {
        img = images[Math.floor(Math.random() * images.length)]
      }, 24)
    }
    return () => {
      clearInterval(animationId)
    }
  }, [gameStarted])

  useEffect(() => {
    let obstacleTimeId
    if(gameStarted && obstacleLeft >= -obstacleWidth) {
      obstacleTimeId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - 5)}, 24)

        return () => {
          clearInterval(obstacleTimeId)
        }

    } else {
        setObstacleLeft(gameWidth - obstacleWidth)
        setObstacleHeight(Math.random() * (gameHeight - gap))
        if(gameStarted === true){
        setScore(score => score + 1)
        }
      }
  },
  [gameStarted, obstacleLeft, score]
  )



  useEffect(() => {
    const hasColliededWithTop = birdPosition >= 0 && birdPosition <= obstaclHeight && obstacleLeft <= birdSize
    const hasColliededWithBottom = birdPosition <= 500 && birdPosition >= 500 - bottomObstacleHeight && obstacleLeft <= birdSize
    const hitFloor = birdPosition >= gameHeight - birdSize
    console.log(hasColliededWithTop, hasColliededWithBottom, hitFloor)

    if(obstacleLeft >= 0 && obstacleLeft <= obstacleWidth && (hasColliededWithTop || hasColliededWithBottom)) {
      setGameStarted(false)
    }

    if(hitFloor) {
      setGameStarted(false)
    }
  }, [birdPosition, bottomObstacleHeight, obstaclHeight, obstacleLeft, gameHeight, gameStarted])



  return (
    <Div onClick={handleCLick}>
      <GameBox height={gameHeight} width={gameWidth}>

        <Obstacle 
          height={obstaclHeight} 
          width={obstacleWidth} 
          left={obstacleLeft} 
          top={0}
        />
        <Obstacle 
          height={bottomObstacleHeight} 
          width={obstacleWidth} 
          left={obstacleLeft} 
          top={gameHeight - (obstaclHeight + bottomObstacleHeight)}
        />

        <Bird height={birdSize} width={birdSize} top={birdPosition} img={img}/>
      </GameBox>
      <div>
        {score}
      </div>
    </Div>
  )
}

export default App

const Bird = styled.div`
  position: absolute;
  // background-color: red;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  top: ${props => props.top}px;
  border-radius: 0;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-size: contain;
  `

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  & > div {
    color: white;
    font-size: 50px;
    position: absolute;
    }`

  const GameBox = styled.div`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: lightblue;
  overflow: hidden;
  `

const Obstacle = styled.div`
  position: relative;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  background-color: green;
  `


