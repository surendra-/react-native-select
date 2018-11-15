# React Native Select Component

### Example
```
 const options = [
     {
         key:1,
         label:'One'
     },
     {
         Key:2,
         label:'Two'
     }
 ]

 <Select
    placeHolder = "Select an Option",
    options={options}
    onChange={(item)=>{
        console.log('SELECTED', item)
    }}
 />

 ```