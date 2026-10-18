    // Terminal Tab Switching
    const terminalData = {
      k8s: `
<p><span class="t-prompt">karthi@eks-cluster:~$</span> <span class="t-cmd">kubectl get pods,svc -n production</span></p>
<div class="t-res">
NAME                               READY   STATUS    RESTARTS   AGE<br>
pod/trend-store-789cfb4d-9v2x      1/1     <span class="t-success">Running</span>   0          42m<br>
pod/trend-store-789cfb4d-lp4w      1/1     <span class="t-success">Running</span>   0          42m<br>
pod/mindtrack-app-54cbb6df-x82m    1/1     <span class="t-success">Running</span>   0          2h<br><br>
NAME                          TYPE           CLUSTER-IP      EXTERNAL-IP<br>
service/trend-store-svc       <span class="t-info">LoadBalancer</span>   10.100.12.84    <span class="t-cyan">k8s-alb-84920.us-east-1.elb.amazonaws.com</span><br>
service/mindtrack-svc         <span class="t-info">LoadBalancer</span>   10.100.88.19    <span class="t-cyan">k8s-alb-19402.us-east-1.elb.amazonaws.com</span>
</div>
<p><span class="t-prompt">karthi@eks-cluster:~$</span> <span class="t-cmd">kubectl get nodes</span></p>
<div class="t-res">
NAME                                            STATUS   ROLES    AGE   VERSION<br>
ip-10-0-1-142.ec2.internal                      <span class="t-success">Ready</span>    node     4d    v1.29.3-eks<br>
ip-10-0-2-209.ec2.internal                      <span class="t-success">Ready</span>    node     4d    v1.29.3-eks
</div>`,
      tf: `
<p><span class="t-prompt">karthi@aws-iac:~/terraform$</span> <span class="t-cmd">terraform apply -auto-approve</span></p>
<div class="t-res">
aws_vpc.production: Refreshing state... [id=vpc-09fa49e81b]<br>
aws_subnet.public_subnet: Refreshing state... [id=subnet-0814a2]<br>
aws_internet_gateway.gw: Refreshing state... [id=igw-0df3a1b]<br>
aws_security_group.jenkins_sg: Refreshing state... [id=sg-0210e39c]<br>
aws_instance.jenkins_server: Creating...<br>
aws_instance.jenkins_server: Provisioning with user-data script...<br>
<span class="t-success">Apply complete!</span> Resources: 4 added, 0 changed, 0 destroyed.<br><br>
Outputs:<br>
jenkins_public_ip = "<span class="t-cyan">3.84.192.45</span>"<br>
eks_cluster_endpoint = "<span class="t-cyan">https://F491E.gr7.us-east-1.eks.amazonaws.com</span>"
</div>`,
      docker: `
<p><span class="t-prompt">karthi@devops-node:~$</span> <span class="t-cmd">docker-compose ps</span></p>
<div class="t-res">
NAME                  IMAGE                        COMMAND                  SERVICE      STATUS              PORTS<br>
trend-store-web       karthi271/trend-store:latest "nginx -g 'daemon of..."   web          <span class="t-success">Up 5 hours</span>          0.0.0.0:80->80/tcp<br>
mindtrack-client      karthi271/mindtrack:v1.2     "docker-entrypoint.s..."   app          <span class="t-success">Up 5 hours</span>          0.0.0.0:3000->3000/tcp<br>
jenkins-controller    jenkins/jenkins:lts-jdk17    "/usr/bin/tini -- /u..."   jenkins      <span class="t-success">Up 2 days</span>           0.0.0.0:8080->8080/tcp
</div>
<p><span class="t-prompt">karthi@devops-node:~$</span> <span class="t-cmd">docker images</span></p>
<div class="t-res">
REPOSITORY              TAG       IMAGE ID       SIZE<br>
karthi271/trend-store   latest    e8b3941a8421   42.8MB<br>
karthi271/mindtrack     v1.2      9df193ca4872   56.1MB
</div>`
    };

    function switchTerminal(key, btn) {
      document.querySelectorAll('.terminal-tab-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = btn || (window.event && window.event.target ? window.event.target.closest('.terminal-tab-btn') : null);
      if (activeBtn) activeBtn.classList.add('active');
      const terminalContent = document.getElementById('terminal-content');
      if (terminalContent && terminalData[key]) {
        terminalContent.innerHTML = terminalData[key];
      }
    }

    // Projects Filtering
    function filterProjects(category, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = btn || (window.event && window.event.target ? window.event.target.closest('.filter-btn') : null);
      if (activeBtn) activeBtn.classList.add('active');

      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        if (category === 'all') {
          card.style.display = 'flex';
        } else {
          const cats = card.getAttribute('data-category') || '';
          if (cats.includes(category)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    }

    // CI/CD Pipeline Simulator Animation
    let simulationRunning = false;
    function runPipelineSimulation() {
      if (simulationRunning) return;
      simulationRunning = true;
      const stages = [1, 2, 3, 4, 5];
      
      // Reset stages
      stages.forEach(s => {
        const el = document.getElementById(`stage-${s}`);
        if (el) el.classList.remove('active-stage');
      });

      let current = 0;
      const interval = setInterval(() => {
        if (current > 0) {
          const prev = document.getElementById(`stage-${stages[current - 1]}`);
          if (prev) prev.classList.remove('active-stage');
        }
        if (current < stages.length) {
          const el = document.getElementById(`stage-${stages[current]}`);
          if (el) el.classList.add('active-stage');
          current++;
        } else {
          clearInterval(interval);
          // Highlight all
          stages.forEach(s => {
            const el = document.getElementById(`stage-${s}`);
            if (el) el.classList.add('active-stage');
          });
          simulationRunning = false;
        }
      }, 700);
    }
