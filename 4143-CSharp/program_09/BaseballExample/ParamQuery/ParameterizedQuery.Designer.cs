namespace ParamQuery
{
    partial class ParameterizedQuery
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ParameterizedQuery));
            System.Windows.Forms.Label playerIDLabel;
            System.Windows.Forms.Label firstNameLabel;
            System.Windows.Forms.Label lastNameLabel;
            System.Windows.Forms.Label battingAverageLabel;
            this.baseballDataSet = new ParamQuery.BaseballDataSet();
            this.playersBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.playersTableAdapter = new ParamQuery.BaseballDataSetTableAdapters.PlayersTableAdapter();
            this.tableAdapterManager = new ParamQuery.BaseballDataSetTableAdapters.TableAdapterManager();
            this.playersBindingNavigator = new System.Windows.Forms.BindingNavigator(this.components);
            this.bindingNavigatorMoveFirstItem = new System.Windows.Forms.ToolStripButton();
            this.bindingNavigatorMovePreviousItem = new System.Windows.Forms.ToolStripButton();
            this.bindingNavigatorSeparator = new System.Windows.Forms.ToolStripSeparator();
            this.bindingNavigatorPositionItem = new System.Windows.Forms.ToolStripTextBox();
            this.bindingNavigatorCountItem = new System.Windows.Forms.ToolStripLabel();
            this.bindingNavigatorSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.bindingNavigatorMoveNextItem = new System.Windows.Forms.ToolStripButton();
            this.bindingNavigatorMoveLastItem = new System.Windows.Forms.ToolStripButton();
            this.bindingNavigatorSeparator2 = new System.Windows.Forms.ToolStripSeparator();
            this.bindingNavigatorAddNewItem = new System.Windows.Forms.ToolStripButton();
            this.bindingNavigatorDeleteItem = new System.Windows.Forms.ToolStripButton();
            this.playersBindingNavigatorSaveItem = new System.Windows.Forms.ToolStripButton();
            this.playerIDTextBox = new System.Windows.Forms.TextBox();
            this.firstNameTextBox = new System.Windows.Forms.TextBox();
            this.lastNameTextBox = new System.Windows.Forms.TextBox();
            this.battingAverageTextBox = new System.Windows.Forms.TextBox();
            this.QueryGroup = new System.Windows.Forms.GroupBox();
            this.QueryLabel = new System.Windows.Forms.Label();
            this.QueryTextBox = new System.Windows.Forms.TextBox();
            this.QueryFindButton = new System.Windows.Forms.Button();
            this.BrowseAllButton = new System.Windows.Forms.Button();
            playerIDLabel = new System.Windows.Forms.Label();
            firstNameLabel = new System.Windows.Forms.Label();
            lastNameLabel = new System.Windows.Forms.Label();
            battingAverageLabel = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.baseballDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.playersBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.playersBindingNavigator)).BeginInit();
            this.playersBindingNavigator.SuspendLayout();
            this.QueryGroup.SuspendLayout();
            this.SuspendLayout();
            // 
            // baseballDataSet
            // 
            this.baseballDataSet.DataSetName = "BaseballDataSet";
            this.baseballDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // playersBindingSource
            // 
            this.playersBindingSource.DataMember = "Players";
            this.playersBindingSource.DataSource = this.baseballDataSet;
            // 
            // playersTableAdapter
            // 
            this.playersTableAdapter.ClearBeforeFill = true;
            // 
            // tableAdapterManager
            // 
            this.tableAdapterManager.BackupDataSetBeforeUpdate = false;
            this.tableAdapterManager.PlayersTableAdapter = this.playersTableAdapter;
            this.tableAdapterManager.UpdateOrder = ParamQuery.BaseballDataSetTableAdapters.TableAdapterManager.UpdateOrderOption.InsertUpdateDelete;
            // 
            // playersBindingNavigator
            // 
            this.playersBindingNavigator.AddNewItem = this.bindingNavigatorAddNewItem;
            this.playersBindingNavigator.BindingSource = this.playersBindingSource;
            this.playersBindingNavigator.CountItem = this.bindingNavigatorCountItem;
            this.playersBindingNavigator.DeleteItem = this.bindingNavigatorDeleteItem;
            this.playersBindingNavigator.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.bindingNavigatorMoveFirstItem,
            this.bindingNavigatorMovePreviousItem,
            this.bindingNavigatorSeparator,
            this.bindingNavigatorPositionItem,
            this.bindingNavigatorCountItem,
            this.bindingNavigatorSeparator1,
            this.bindingNavigatorMoveNextItem,
            this.bindingNavigatorMoveLastItem,
            this.bindingNavigatorSeparator2,
            this.bindingNavigatorAddNewItem,
            this.bindingNavigatorDeleteItem,
            this.playersBindingNavigatorSaveItem});
            this.playersBindingNavigator.Location = new System.Drawing.Point(0, 0);
            this.playersBindingNavigator.MoveFirstItem = this.bindingNavigatorMoveFirstItem;
            this.playersBindingNavigator.MoveLastItem = this.bindingNavigatorMoveLastItem;
            this.playersBindingNavigator.MoveNextItem = this.bindingNavigatorMoveNextItem;
            this.playersBindingNavigator.MovePreviousItem = this.bindingNavigatorMovePreviousItem;
            this.playersBindingNavigator.Name = "playersBindingNavigator";
            this.playersBindingNavigator.PositionItem = this.bindingNavigatorPositionItem;
            this.playersBindingNavigator.Size = new System.Drawing.Size(800, 25);
            this.playersBindingNavigator.TabIndex = 0;
            this.playersBindingNavigator.Text = "bindingNavigator1";
            // 
            // bindingNavigatorMoveFirstItem
            // 
            this.bindingNavigatorMoveFirstItem.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.bindingNavigatorMoveFirstItem.Image = ((System.Drawing.Image)(resources.GetObject("bindingNavigatorMoveFirstItem.Image")));
            this.bindingNavigatorMoveFirstItem.Name = "bindingNavigatorMoveFirstItem";
            this.bindingNavigatorMoveFirstItem.RightToLeftAutoMirrorImage = true;
            this.bindingNavigatorMoveFirstItem.Size = new System.Drawing.Size(23, 22);
            this.bindingNavigatorMoveFirstItem.Text = "Move first";
            // 
            // bindingNavigatorMovePreviousItem
            // 
            this.bindingNavigatorMovePreviousItem.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.bindingNavigatorMovePreviousItem.Image = ((System.Drawing.Image)(resources.GetObject("bindingNavigatorMovePreviousItem.Image")));
            this.bindingNavigatorMovePreviousItem.Name = "bindingNavigatorMovePreviousItem";
            this.bindingNavigatorMovePreviousItem.RightToLeftAutoMirrorImage = true;
            this.bindingNavigatorMovePreviousItem.Size = new System.Drawing.Size(23, 22);
            this.bindingNavigatorMovePreviousItem.Text = "Move previous";
            // 
            // bindingNavigatorSeparator
            // 
            this.bindingNavigatorSeparator.Name = "bindingNavigatorSeparator";
            this.bindingNavigatorSeparator.Size = new System.Drawing.Size(6, 25);
            // 
            // bindingNavigatorPositionItem
            // 
            this.bindingNavigatorPositionItem.AccessibleName = "Position";
            this.bindingNavigatorPositionItem.AutoSize = false;
            this.bindingNavigatorPositionItem.Name = "bindingNavigatorPositionItem";
            this.bindingNavigatorPositionItem.Size = new System.Drawing.Size(50, 23);
            this.bindingNavigatorPositionItem.Text = "0";
            this.bindingNavigatorPositionItem.ToolTipText = "Current position";
            // 
            // bindingNavigatorCountItem
            // 
            this.bindingNavigatorCountItem.Name = "bindingNavigatorCountItem";
            this.bindingNavigatorCountItem.Size = new System.Drawing.Size(35, 22);
            this.bindingNavigatorCountItem.Text = "of {0}";
            this.bindingNavigatorCountItem.ToolTipText = "Total number of items";
            // 
            // bindingNavigatorSeparator1
            // 
            this.bindingNavigatorSeparator1.Name = "bindingNavigatorSeparator";
            this.bindingNavigatorSeparator1.Size = new System.Drawing.Size(6, 25);
            // 
            // bindingNavigatorMoveNextItem
            // 
            this.bindingNavigatorMoveNextItem.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.bindingNavigatorMoveNextItem.Image = ((System.Drawing.Image)(resources.GetObject("bindingNavigatorMoveNextItem.Image")));
            this.bindingNavigatorMoveNextItem.Name = "bindingNavigatorMoveNextItem";
            this.bindingNavigatorMoveNextItem.RightToLeftAutoMirrorImage = true;
            this.bindingNavigatorMoveNextItem.Size = new System.Drawing.Size(23, 22);
            this.bindingNavigatorMoveNextItem.Text = "Move next";
            // 
            // bindingNavigatorMoveLastItem
            // 
            this.bindingNavigatorMoveLastItem.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.bindingNavigatorMoveLastItem.Image = ((System.Drawing.Image)(resources.GetObject("bindingNavigatorMoveLastItem.Image")));
            this.bindingNavigatorMoveLastItem.Name = "bindingNavigatorMoveLastItem";
            this.bindingNavigatorMoveLastItem.RightToLeftAutoMirrorImage = true;
            this.bindingNavigatorMoveLastItem.Size = new System.Drawing.Size(23, 22);
            this.bindingNavigatorMoveLastItem.Text = "Move last";
            // 
            // bindingNavigatorSeparator2
            // 
            this.bindingNavigatorSeparator2.Name = "bindingNavigatorSeparator";
            this.bindingNavigatorSeparator2.Size = new System.Drawing.Size(6, 25);
            // 
            // bindingNavigatorAddNewItem
            // 
            this.bindingNavigatorAddNewItem.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.bindingNavigatorAddNewItem.Image = ((System.Drawing.Image)(resources.GetObject("bindingNavigatorAddNewItem.Image")));
            this.bindingNavigatorAddNewItem.Name = "bindingNavigatorAddNewItem";
            this.bindingNavigatorAddNewItem.RightToLeftAutoMirrorImage = true;
            this.bindingNavigatorAddNewItem.Size = new System.Drawing.Size(23, 22);
            this.bindingNavigatorAddNewItem.Text = "Add new";
            // 
            // bindingNavigatorDeleteItem
            // 
            this.bindingNavigatorDeleteItem.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.bindingNavigatorDeleteItem.Image = ((System.Drawing.Image)(resources.GetObject("bindingNavigatorDeleteItem.Image")));
            this.bindingNavigatorDeleteItem.Name = "bindingNavigatorDeleteItem";
            this.bindingNavigatorDeleteItem.RightToLeftAutoMirrorImage = true;
            this.bindingNavigatorDeleteItem.Size = new System.Drawing.Size(23, 22);
            this.bindingNavigatorDeleteItem.Text = "Delete";
            // 
            // playersBindingNavigatorSaveItem
            // 
            this.playersBindingNavigatorSaveItem.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.playersBindingNavigatorSaveItem.Image = ((System.Drawing.Image)(resources.GetObject("playersBindingNavigatorSaveItem.Image")));
            this.playersBindingNavigatorSaveItem.Name = "playersBindingNavigatorSaveItem";
            this.playersBindingNavigatorSaveItem.Size = new System.Drawing.Size(23, 22);
            this.playersBindingNavigatorSaveItem.Text = "Save Data";
            this.playersBindingNavigatorSaveItem.Click += new System.EventHandler(this.playersBindingNavigatorSaveItem_Click);
            // 
            // playerIDLabel
            // 
            playerIDLabel.AutoSize = true;
            playerIDLabel.Location = new System.Drawing.Point(45, 56);
            playerIDLabel.Name = "playerIDLabel";
            playerIDLabel.Size = new System.Drawing.Size(53, 13);
            playerIDLabel.TabIndex = 1;
            playerIDLabel.Text = "Player ID:";
            // 
            // playerIDTextBox
            // 
            this.playerIDTextBox.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.playersBindingSource, "PlayerID", true));
            this.playerIDTextBox.Location = new System.Drawing.Point(137, 53);
            this.playerIDTextBox.Name = "playerIDTextBox";
            this.playerIDTextBox.Size = new System.Drawing.Size(100, 20);
            this.playerIDTextBox.TabIndex = 2;
            // 
            // firstNameLabel
            // 
            firstNameLabel.AutoSize = true;
            firstNameLabel.Location = new System.Drawing.Point(45, 82);
            firstNameLabel.Name = "firstNameLabel";
            firstNameLabel.Size = new System.Drawing.Size(60, 13);
            firstNameLabel.TabIndex = 3;
            firstNameLabel.Text = "First Name:";
            // 
            // firstNameTextBox
            // 
            this.firstNameTextBox.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.playersBindingSource, "FirstName", true));
            this.firstNameTextBox.Location = new System.Drawing.Point(137, 79);
            this.firstNameTextBox.Name = "firstNameTextBox";
            this.firstNameTextBox.Size = new System.Drawing.Size(100, 20);
            this.firstNameTextBox.TabIndex = 4;
            // 
            // lastNameLabel
            // 
            lastNameLabel.AutoSize = true;
            lastNameLabel.Location = new System.Drawing.Point(45, 108);
            lastNameLabel.Name = "lastNameLabel";
            lastNameLabel.Size = new System.Drawing.Size(61, 13);
            lastNameLabel.TabIndex = 5;
            lastNameLabel.Text = "Last Name:";
            // 
            // lastNameTextBox
            // 
            this.lastNameTextBox.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.playersBindingSource, "LastName", true));
            this.lastNameTextBox.Location = new System.Drawing.Point(137, 105);
            this.lastNameTextBox.Name = "lastNameTextBox";
            this.lastNameTextBox.Size = new System.Drawing.Size(100, 20);
            this.lastNameTextBox.TabIndex = 6;
            // 
            // battingAverageLabel
            // 
            battingAverageLabel.AutoSize = true;
            battingAverageLabel.Location = new System.Drawing.Point(45, 134);
            battingAverageLabel.Name = "battingAverageLabel";
            battingAverageLabel.Size = new System.Drawing.Size(86, 13);
            battingAverageLabel.TabIndex = 7;
            battingAverageLabel.Text = "Batting Average:";
            // 
            // battingAverageTextBox
            // 
            this.battingAverageTextBox.DataBindings.Add(new System.Windows.Forms.Binding("Text", this.playersBindingSource, "BattingAverage", true));
            this.battingAverageTextBox.Location = new System.Drawing.Point(137, 131);
            this.battingAverageTextBox.Name = "battingAverageTextBox";
            this.battingAverageTextBox.Size = new System.Drawing.Size(100, 20);
            this.battingAverageTextBox.TabIndex = 8;
            // 
            // QueryGroup
            // 
            this.QueryGroup.Controls.Add(this.QueryFindButton);
            this.QueryGroup.Controls.Add(this.QueryTextBox);
            this.QueryGroup.Controls.Add(this.QueryLabel);
            this.QueryGroup.Location = new System.Drawing.Point(48, 245);
            this.QueryGroup.Name = "QueryGroup";
            this.QueryGroup.Size = new System.Drawing.Size(693, 124);
            this.QueryGroup.TabIndex = 9;
            this.QueryGroup.TabStop = false;
            this.QueryGroup.Text = "Find an entry by last name";
            // 
            // QueryLabel
            // 
            this.QueryLabel.AutoSize = true;
            this.QueryLabel.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.QueryLabel.Location = new System.Drawing.Point(19, 58);
            this.QueryLabel.Name = "QueryLabel";
            this.QueryLabel.Size = new System.Drawing.Size(115, 25);
            this.QueryLabel.TabIndex = 0;
            this.QueryLabel.Text = "Last Name";
            // 
            // QueryTextBox
            // 
            this.QueryTextBox.Location = new System.Drawing.Point(140, 63);
            this.QueryTextBox.Name = "QueryTextBox";
            this.QueryTextBox.Size = new System.Drawing.Size(167, 20);
            this.QueryTextBox.TabIndex = 1;
            // 
            // QueryFindButton
            // 
            this.QueryFindButton.Location = new System.Drawing.Point(481, 58);
            this.QueryFindButton.Name = "QueryFindButton";
            this.QueryFindButton.Size = new System.Drawing.Size(75, 23);
            this.QueryFindButton.TabIndex = 2;
            this.QueryFindButton.Text = "Find";
            this.QueryFindButton.UseVisualStyleBackColor = true;
            this.QueryFindButton.Click += new System.EventHandler(this.QueryFindButton_Click);
            // 
            // BrowseAllButton
            // 
            this.BrowseAllButton.Location = new System.Drawing.Point(310, 401);
            this.BrowseAllButton.Name = "BrowseAllButton";
            this.BrowseAllButton.Size = new System.Drawing.Size(75, 23);
            this.BrowseAllButton.TabIndex = 10;
            this.BrowseAllButton.Text = "Browse All";
            this.BrowseAllButton.UseVisualStyleBackColor = true;
            this.BrowseAllButton.Click += new System.EventHandler(this.BrowseAllButton_Click);
            // 
            // ParameterizedQuery
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.BrowseAllButton);
            this.Controls.Add(this.QueryGroup);
            this.Controls.Add(playerIDLabel);
            this.Controls.Add(this.playerIDTextBox);
            this.Controls.Add(firstNameLabel);
            this.Controls.Add(this.firstNameTextBox);
            this.Controls.Add(lastNameLabel);
            this.Controls.Add(this.lastNameTextBox);
            this.Controls.Add(battingAverageLabel);
            this.Controls.Add(this.battingAverageTextBox);
            this.Controls.Add(this.playersBindingNavigator);
            this.Name = "ParameterizedQuery";
            this.Text = "Parameterized Query";
            this.Load += new System.EventHandler(this.ParameterizedQuery_Load);
            ((System.ComponentModel.ISupportInitialize)(this.baseballDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.playersBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.playersBindingNavigator)).EndInit();
            this.playersBindingNavigator.ResumeLayout(false);
            this.playersBindingNavigator.PerformLayout();
            this.QueryGroup.ResumeLayout(false);
            this.QueryGroup.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private BaseballDataSet baseballDataSet;
        private System.Windows.Forms.BindingSource playersBindingSource;
        private BaseballDataSetTableAdapters.PlayersTableAdapter playersTableAdapter;
        private BaseballDataSetTableAdapters.TableAdapterManager tableAdapterManager;
        private System.Windows.Forms.BindingNavigator playersBindingNavigator;
        private System.Windows.Forms.ToolStripButton bindingNavigatorAddNewItem;
        private System.Windows.Forms.ToolStripLabel bindingNavigatorCountItem;
        private System.Windows.Forms.ToolStripButton bindingNavigatorDeleteItem;
        private System.Windows.Forms.ToolStripButton bindingNavigatorMoveFirstItem;
        private System.Windows.Forms.ToolStripButton bindingNavigatorMovePreviousItem;
        private System.Windows.Forms.ToolStripSeparator bindingNavigatorSeparator;
        private System.Windows.Forms.ToolStripTextBox bindingNavigatorPositionItem;
        private System.Windows.Forms.ToolStripSeparator bindingNavigatorSeparator1;
        private System.Windows.Forms.ToolStripButton bindingNavigatorMoveNextItem;
        private System.Windows.Forms.ToolStripButton bindingNavigatorMoveLastItem;
        private System.Windows.Forms.ToolStripSeparator bindingNavigatorSeparator2;
        private System.Windows.Forms.ToolStripButton playersBindingNavigatorSaveItem;
        private System.Windows.Forms.TextBox playerIDTextBox;
        private System.Windows.Forms.TextBox firstNameTextBox;
        private System.Windows.Forms.TextBox lastNameTextBox;
        private System.Windows.Forms.TextBox battingAverageTextBox;
        private System.Windows.Forms.GroupBox QueryGroup;
        private System.Windows.Forms.Button QueryFindButton;
        private System.Windows.Forms.TextBox QueryTextBox;
        private System.Windows.Forms.Label QueryLabel;
        private System.Windows.Forms.Button BrowseAllButton;
    }
}

