"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const app_1 = require("./app");
describe('App', () => {
    beforeEach(async () => {
        await testing_1.TestBed.configureTestingModule({
            imports: [app_1.App],
        }).compileComponents();
    });
    it('should create the app', () => {
        const fixture = testing_1.TestBed.createComponent(app_1.App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    it('should render title', async () => {
        const fixture = testing_1.TestBed.createComponent(app_1.App);
        await fixture.whenStable();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Hello, frontend');
    });
});
