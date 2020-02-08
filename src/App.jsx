class IssueFilter extends React.Component {
  render() {
    return (
      <div>Showing all avalible products</div>
    );
  }
}

function IssueRow(props) {
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.name}</td>
      <td>${issue.price}</td>
      <td>{issue.category}</td>
      <td><a href={issue.image} target="_blank">view</a></td>
    </tr>
  );
}

function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );

  return (
    <table className="bordered-table" border="2">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {issueRows}
      </tbody>
    </table>
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      category: form.category.value, price: form.price.value.replace("$",""), name: form.name.value , image: form.image.value
    }
    this.props.createIssue(issue);
    form.category.value = "Shirts"; form.price.value = "$";form.name.value = "";form.image.value = "";
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
	Category:<br/>
	<select name="category">
        <option value="Shirts">Shirts</option>
        <option value="Jeans">Jeans</option>
	<option value="Jackets">Jackets</option>
	<option value="Sweaters">Sweaters</option>
	<option value="Accessories">Accessories</option>
	</select>
	<br/>
	Price Per Unit:<br/>
        <input type="text" name="price" placeholder="$"/>
	<br/>
	Product Name:<br/>
        <input type="text" name="name" placeholder="Product Name" />
	<br/>
	Image URL:<br/>
        <input type="text" name="image" placeholder="Image" />
	<br/>
        <button>Add Product</button>
      </form>
    );
  }
}

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ issues: initialIssues });
    }, 500);
  }

  createIssue(issue) {
    issue.id = this.state.issues.length + 1;
    issue.created = new Date();
    const newIssueList = this.state.issues.slice();
    newIssueList.push(issue);
    this.setState({ issues: newIssueList });
  }

  render() {
    return (
      <React.Fragment>
        <h1>My company Inventory</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <h2>Add a new product to inventory</h2>
        <IssueAdd createIssue={this.createIssue} />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
