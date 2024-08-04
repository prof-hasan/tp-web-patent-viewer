import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SearchPatentsComponent } from "./search-patents.component";

describe("SearchPatentsComponent", () => {
	let component: SearchPatentsComponent;
	let fixture: ComponentFixture<SearchPatentsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SearchPatentsComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(SearchPatentsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
