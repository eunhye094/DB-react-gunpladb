import { useState, useEffect } from 'react';
import axios from 'axios';

export default function table() {
	return (
		<div>
			<GunplaHeader />
			<GunplaTable />
		</div>
	)
}

const GunplaHeader = () => {
	return <h1>React 데이터베이스 예제 프로그래밍</h1>
}

// const units = [
//   { name: "건담", model: "RX-78-2" }, 
//   { name: "자쿠II", model: "MS-06F"},
//   { name: "건탱크", model: "RX-75"}, 
//   { name: "건캐논", model: "RX-77-2"}
// ]

const GunplaTable = () => {
	const [units, setUnits] = useState([])
	
	const fetchGunpla = async () => {
		try {
			const res = await axios.get('https://react-gunpladb-zvlcw.run.goorm.io/api/gunpla')
			setUnits(res.data)
		} catch (err) {
			console.log(err)
		}
	}
	
	useEffect(() => {
		fetchGunpla()
	}, [])
	
	return (
		<table>
			<tr>
				<th>이미지</th>
				<th>이름</th>
				<th>모델</th>
				<th>등급</th>
				<th>설명</th>
				<th>박스아트</th>
			</tr>
			{units.map((unit, index) => 
				<tr key={index}>
					<td>{unit.filename}</td>
					<td>{unit.name}</td>
					<td>{unit.model}</td>
					<td>{unit.grade}</td>
					<td>{unit.description}</td>
					<td ><img src={unit.boxart} className='boxart'/></td>
				</tr>
			)}
		</table>
	)
}
