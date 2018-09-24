import "./App.css";
import React, { Component } from "react";
import { Chips } from "primereact/chips";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export class App extends Component {
    errors = {
        requiredAccountNo: "Account number is required.",
        invalidAccountNo: "Please enter a valid account number. It should contain only numbers."
    };

    constructor() {
        super();

        this.state = {
            values: [],
            errorType: null,
            hasErrors: false
        };
    }

    setErrorState(error, errorType) {
        this.setState({
            hasErrors: error,
            errorType: errorType
        });
    }

    onRemoveAccount(e) {
        if (e && e.value) {
            const idx = this.state.values.indexOf(e.value[0]);
            let values = [...this.state.values];
            values.splice(idx, 1);

            this.setState({
                values: [...values]
            });
        }
    }

    onAddAccount(e) {
        if (e) {
            if (e.value) {
                const currItem = e.value,
                    re = new RegExp(/^\d+$/),
                    isAllNumbers = re.test(currItem);

                if (isAllNumbers) {
                    this.setErrorState(false, null);
                    this.setState({ values: [...this.state.values, e.value] });
                } else {
                    this.setErrorState(true, "invalidAccountNo");
                }
            } else {
                this.setErrorState(true, "requiredAccountNo");
            }
        }
    }

    onEnterAccount(e) {
        if (e.which === 13 || e.keyCode === 13) {
            e.currentTarget.vaule = e.currentTarget.value.replace(/\s+/, '');
            this.onAddAccount(e.currentTarget);
        }
    }

    render() {
        const classes = `p-chips p-component ${this.state.hasErrors ? 'chips-error' : ''}`;

        return (
            <div className="app-container">
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>KKR Demo</h1>
                    </div>
                </div>

                <hr />
                <div className="content-section implementation">
                    <h3>Enter multiple Account Numbers</h3>

                    {this.state.values.length <= 0 ? (
                        <div className={classes}>
                            <input
                                className="p-inputtext"
                                onKeyPress={this.onEnterAccount.bind(this)}
                            />
                        </div>
                    ) : (
                            <Chips
                                value={this.state.values}
                                onAdd={this.onAddAccount.bind(this)}
                                onRemove={this.onRemoveAccount.bind(this)}
                                className={this.state.hasErrors ? "chips-error" : ""}
                            />
                        )}
                </div>

                <span className="validation-errors">
                    {
                        (this.state.hasErrors)
                            ? (this.state.errorType)
                                ? this.errors[this.state.errorType]
                                : ""
                            : ""
                    }
                </span>
            </div>
        );
    }
}
export default App;
