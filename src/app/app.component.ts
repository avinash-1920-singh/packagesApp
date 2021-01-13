import { AfterViewInit, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'packagesApp';
  packageName:any
  proAndEssentials:any;
  premium:any;
  mapOfPackages:any;
  @ViewChildren('packages')packages:QueryList<ElementRef>
  constructor(private http:HttpClient,private renderer:Renderer2){}
  ngOnInit(){
    this.packageName=[];
    this.mapOfPackages={};
    this.http.
    get('https://apidevb2b.openapp.co/api/v2.2/tusk/web/packages').subscribe((res:any)=>{
      console.log(res['data'])
      if(res['data']){
        res['data'].forEach((val:any)=>{
         this.packageName.push(val['name'])
         this.mapOfPackages[val['name']]=val['packages']
        })
        this.generateData(this.packageName[0],0)
      }
      
    })
  }
  ngAfterViewInit(){
    console.log(this.packages)
    

  }
  generateData(packageName:string,index:any){
    this.proAndEssentials=[];
    this.premium=[];
 this.mapOfPackages[packageName].forEach((val:any)=>{
   if(val['name'].trim().toLowerCase()==='essentials' || val['name'].trim().toLowerCase()==='pro'){
     this.proAndEssentials.push(val);
   }
   else{
     this.premium.push(val);
   }
 })
 console.log(this.proAndEssentials)
 setTimeout(()=>{
  this.renderer.setStyle(this.packages.toArray()[index].nativeElement,'background-color','#feb42b');
  this.packages.toArray().forEach((el,i)=>{
    if(i!==index){
      this.renderer.setStyle(el.nativeElement,'background-color','#ffffff')
    }
  })
 })
 
   
 }
 
}
