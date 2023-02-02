import React, { useEffect, useState } from 'react'

const Taxonomy = () => {

    var [data,setData]=useState()
    var [sel1,setSel1]=useState([])
    var [category,setCategory]=useState([])
    var [sel2,setSel2]=useState([])
    var [sel3,setSel3]=useState([])
    var [category2,setCategory2]=useState([])
    var [dataArr,setDataArr]=useState([])
    var obj={}

    useEffect(()=>{
        fetch('./data.txt')
        .then(data=>data.text())
        .then(data=>setData(data))
        readableForm()
    },[data])   

    const readableForm=()=>{
        if(data!==undefined){
            var lowerData = data.split('\n')
            lowerData.map((item)=>{
                var items = item.split('>').map((el)=>el.trim())
                // console.log(items)
                createNestedObject(obj,items)

                // category2.push(item.split('>'))
                // if(!item.includes('>')){ 
                //     dataArr.push({[item]:[]})
                //     if(!sel1.includes(item)){
                //         sel1.push(item)
                //     }
                // } 
                // if(item.includes('>')){
                //     category.push(item.slice(item.indexOf('>')+2))
                // }
            })
            dataArr.push(obj)
            setDataArr([...dataArr])
            // setCategory2([...category2])
            // setSel1([...sel1])
            // setCategory([...category])
            // categoryData()
            // setDataArr([...dataArr])
            // category2Func()
        }
    }
    // console.log(dataArr)

    var createNestedObject = function( base, names ) {
        for( var i = 0; i < names.length; i++ ) {
            base = base[ names[i] ] = base[ names[i] ] || {};
        }
        // console.log(base)
    };

    // console.log(obj)

    // const category2Func =()=>{
       
    //     // console.log(category2)
    //     category2.map((item)=>{
    //         if(item.length==1){
    //             // console.log(Object.assign(obj,{[item]:{}}))
    //             // category.push({[item]:{}})
    //             // category.push(Object.assign(obj,{[item]:{}}))
    //         }
    //     })
    //     setCategory([...category])
    //     console.log(category)
    // }

    // const categoryData=()=>{
    //     // console.log(category)
    //     category.slice(0,200).map((item)=>{
    //         if(!item.includes('>')){
    //             dataArr.map((ele)=>{
    //                 // console.log(Object.values(ele))
    //             })
    //         }
    //         // console.log(item.slice(0,item.indexOf('\n'))+1)
    //         // if(!sel2.includes(item.slice(item.indexOf('>')+2)))
    //         // sel2.push(item.slice(0,item.indexOf('>')-1))
    //     })
    //     // setSel2([...sel2])
    //     // // cate2()
    //     // console.log(dataArr)
    // }

    // const cate2=()=>{
    //     sel2.map((item)=>{
    //         if(!item.includes('>')){
    //             if(!sel3.includes(item))
    //                 sel3.push(item)
    //         }
    //         if(item.includes('>')){
    //            category2.push(item)
    //         }
    //     })
    //     setCategory2([...category2])
    //     setSel3([...sel3])
    //     // console.log(sel3,category2)
    // }

    const selectHandler=(e)=>{
        // console.log(dataArr)
        sel1=[]
        Object.keys(dataArr[0]).map((item,i)=>{
            if(item==e.target.value){
                var newObj = Object.values(dataArr[0])[i]
                Object.keys(newObj).map((ele)=>{
                    sel1.push(ele)
                })
            }
        })
        setSel1([...sel1])
        // e.target.value
    }
    console.log(sel1)
    
    return (
    <div>
        <select onChange={(e)=>selectHandler(e)}>
            {dataArr.length==1?
            Object.keys(dataArr[0]).map((ele,i)=>{
                // console.log(ele)
                return <option key={ele}>{ele}</option>
            })
        :<></>}
        </select>
        {sel1.length>0?
        <select>
            {sel1.map((item)=>{
                return <option>{item}</option>
            })}
        </select>
        :<></>}
    </div>
    )
}

export default Taxonomy