import { TestBed } from '@angular/core/testing';
import { SchemaService } from './schema.service';
describe('SchemaService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(SchemaService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=schema.service.spec.js.map