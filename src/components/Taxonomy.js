import React, { useEffect, useState } from 'react'

const Taxonomy = () => {

    var [data,setData]=useState()
    var [sel1,setSel1]=useState([])
    var [category,setCategory]=useState([])
    var [sel2,setSel2]=useState([])
    var [sel3,setSel3]=useState([])
    var [category2,setCategory2]=useState([])

    useEffect(()=>{
        fetch('./data.txt')
        .then(data=>data.text())
        .then(data=>setData(data))
        readableForm()
    },[data])   

    const readableForm=()=>{
        if(data!==undefined){
            // console.log(data)
            var lowerData = data.slice(data.indexOf('\n')+1).split('\n')
            lowerData.map((item)=>{
               for(var i=0;i<item.length;i++){
                if(!item.includes('>')){
                    if(!sel1.includes(item))
                        sel1.push(item)
                }
                if(item.includes('>')){
                    category.push(item)
                }
               } 
            })
            setSel1([...sel1])
            setCategory([...category])
            categoryData()
        }
    }

    const categoryData=()=>{
        category.map((item)=>{
            sel2.push(item.slice(item.indexOf('>')+2).split('\n'))
        })
        setSel2([...sel2])
        cate2()
    }

    const cate2=()=>{
        sel2.slice(0,90000).map((item)=>{
            for(var i=0;i<item.length;i++){
             if(!item.includes('>')){
                 if(!sel3.includes(item))
                     sel3.push(item)
             }
             if(item.includes('>')){
                console.log(item)
                category2.push(item)
             }
            } 
        })
        setCategory2([...category2])
        setSel3([...sel3])
    }
    // console.log(category)
    // console.log(sel3)
    // console.log(sel2)

  return (
    <div>
        <select>
            {sel1.map((item)=>{
                return (<option>{item}</option>)
            })}
        </select>
    </div>
  )
}

export default Taxonomy