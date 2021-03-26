import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title: string = `<div style="font-weight: 1000">TIen <span style="font-weight: 1000">Huynh</span></div>`;
  title= '<p>Cho <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>a</mi></math> và <math xmlns="http://www.w3.org/1998/Math/MathML"><mi>b</mi></math> là hai số thực dương thỏa mãn <math xmlns="http://www.w3.org/1998/Math/MathML"><mrow class="MJX-TeXAtom-ORD"><msup><mi>a</mi><mn>4</mn></msup></mrow><mi>b</mi><mo>=</mo><mn>16</mn></math>. Giá trị của <math xmlns="http://www.w3.org/1998/Math/MathML"><mn>4</mn><mrow class="MJX-TeXAtom-ORD"><msub><mi>log</mi><mn>2</mn></msub></mrow><mi>a</mi><mo>+</mo><mrow class="MJX-TeXAtom-ORD"><msub><mi>log</mi><mn>2</mn></msub></mrow><mi>b</mi></math>&nbsp;bằng:</p>';
@ViewChild('hi') p: ElementRef;
//  doc = new DOMParser().parseFromString(this.title, "text/xml");
//   print() {
//     console.log(this.doc.firstChild); // => <a href="#">Link...
//     console.log(this.doc.firstChild.firstChild);
//   }
//   ngOnInit() {
//     this.print();
//   }

  ngAfterViewInit() {
    // console.log(this.title);
    // this.p.appendChild(this.doc);
    // this.p.nativeElement.insertAdjacentHTML('beforeend', this.title);
  }

  // constructor(
  //   protected readonly iconLibraries: NbIconLibraries
  // ) { 
  //   this.iconLibraries.setDefaultPack('eva');
  //   this.iconLibraries.registerFontPack('font-awesome', { iconClassPrefix: 'fa', packClass: 'fa' });
  //   // this.iconLibraries.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  //   this.iconLibraries.registerFontPack('ion', { iconClassPrefix: 'ion' });
  // }
}
  
