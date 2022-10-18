import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

export default class SearchBar extends NavigationMixin(LightningElement) {
    @track showSpinner = false;
    currentPageReference;

    @api term;
    @track searchBarTerm;

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        this.currentPageReference = currentPageReference;
    }

    connectedCallback() {
        this.searchBarTerm = this.term;
        if(this.term == 'all') {
            this.searchBarTerm = '';
        }
    }

    termPageReference(term) {
        return this.getUpdatedPageReference({
            c__term: term,
        });
    }

    getUpdatedPageReference(stateChanges) {
        return Object.assign({}, this.currentPageReference, {
            state: Object.assign({}, this.currentPageReference.state, stateChanges)
        });
    }

    handleSearchTermChange(event) {
        this.searchBarTerm = event.target.value;
    }

    search(evt) {
        if(this.searchBarTerm == '') {
            evt.preventDefault();
            evt.stopPropagation();
            this[NavigationMixin.Navigate](this.termPageReference(undefined), true);
        } else {
            evt.preventDefault();
            evt.stopPropagation();
            this[NavigationMixin.Navigate](this.termPageReference(this.searchBarTerm), true);
        }
    }
}